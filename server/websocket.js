const websocket = require('ws')
const jwt = require("jsonwebtoken")
const Character = require('./model/character')
const User = require('./model/user')
const dotenv = require('dotenv')
const Message = require('../shared/classes/data/Message')
const { update } = require('./model/user')
const { Error } = require('mongoose')
dotenv.config()
var wss = {}
var connections = new Map()
module.exports.createSocket = () => {
    wss = new websocket.Server({ noServer: true })
    wss.on('connection', function (ws, request) {
        let con = ws
        con.character = {}
        con.on('message', async function incoming(message) {
            try {
                var msg = Message.from(JSON.parse(message))
                switch (msg.type) {
                    case "character":
                        con.character = '' + msg.data
                        addConnection(msg.data, con)
                        break;
                    case "update":
                        var character = await Character.findById(con.character)
                        msg.data.forEach(element => {
                            if (element.task === 'update') {
                                deepMerge(character, element.data)
                            } else if (element.task === 'remove') {
                                deepRemove(character, element.data)
                            } else if (element.task === 'insert') {
                                deepInsert(character, element.data)
                            }
                        })
                        character.save()
                        updateConnections('' + con.character, message, con)
                        break;
                    default:
                        break;
                }
            } catch (err) {
            }
        })

        con.on('close', async function closing(code) {
            await removeConnection(con.character, con)
        })
    })
}
module.exports.handleUpgrade = async (request, socket, head) => {
    if (typeof wss == 'undefined') {
        throw new Error('create a Websocket Server first!')
    }
    if (request.headers.origin != process.env.CLIENT_IP) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
        return
    }
    if (await authenticate(request)) {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request)
        })

    } else {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
        socket.destroy()
    }
}
function deepMerge(object, attributes) {
    var keys = Object.keys(attributes)
    for (let i = 0; i < keys.length; i++) {
        if (typeof object[keys[i]] === 'undefined') {
            object[keys[i]] = attributes[keys[i]]
        }
        if (Array.isArray(object)) {
            deepMerge(object[keys[i]], attributes[keys[i]])
            object.splice(keys[i], 1, object[keys[i]])
        }
        else if (typeof attributes[keys[i]] === 'object') {
            deepMerge(object[keys[i]], attributes[keys[i]])
        } else {
            object[keys[i]] = attributes[keys[i]]
        }
    }
}
function deepRemove(object, attributes) {
    var keys = Object.keys(attributes)
    for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(attributes)) {
            if (Array.isArray(object)) {
                object.splice(attributes[keys[i]], 1)
            } else {
                throw new Error("cannot remove attribute")
            }
        } else {
            deepRemove(object[keys[i]], attributes[keys[i]])
        }
    }
}
function deepInsert(object, attributes) {
    var keys = Object.keys(attributes)
    for (let i = 0; i < keys.length; i++) {
        if (Array.isArray(object)) {
            if (!isNaN(parseInt(keys[i]))) {
                object.splice(keys[i], 0, attributes[keys[i]])
            } else {
                deepInsert(object[keys[i]], attributes[keys[i]])
            }
        }
        else {
            deepInsert(object[keys[i]], attributes[keys[i]])
        }
    }
}
async function addConnection(id, con) {
    var conn = connections.get(id)
    if (typeof conn != 'undefined') {
        conn.sockets.push(con)
    } else {
        var char = await Character.findById(id)
        connections.set(id, { character: char, sockets: new Array() })
        connections.get(id).sockets.push(con)
    }
}
function updateConnections(id, msg, con) {
    var cons = connections.get(id).sockets
    for (let i = 0; i < cons.length; i++) {
        cons[i].send(msg)
    }
}
async function removeConnection(id, con) {
    id = '' + id
    var conn = connections.get(id).sockets
    if (typeof conn != 'undefined') {
        var index = conn.indexOf(con)
        if (index >= 0) {
            conn.splice(index, 1)
        }
        if (conn.length == 0) {
            await connections.get(id).character.save()
            connections.delete(id)
        }
    }
}


async function authenticate(request) {
    const protocol = request.headers['sec-websocket-protocol'].split(', ')
    if (protocol[0] != 'access_token') {
        return false
    }

    const token = protocol[1]
    if (!token) {
        return false
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET)
        const secondsSinceEpoch = Math.round(Date.now() / 1000)
        if (secondsSinceEpoch - decoded.iat >= process.env.TOKEN_TIMEOUT) {
            await User.removeToken(decoded.email, req.headers.token)
            return false;
        }
        return true
    } catch (err) {
        return false
    }

}