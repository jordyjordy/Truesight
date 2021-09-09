express = require('express')
router = express.Router();
auth = require('../config/auth')
const Character = require('../model/character')
router.use(auth)

//characters/list
router.get('/list', async (req, res) => {
    try{
        var result = await Character.findByUser(req.userData._id)
        for (let i = 0; i < result.length; i++) {
            result[i] = {
                _id: result[i]._id,
                name: result[i].name,
                cclass: result[i].cclass
            }
        }
        res.status(200).json(result)
    } catch(err) {
        res.sendStatus(400)
    }
})
//characters/single
router.get('/single', async (req, res) => {
    try{
        const result = await Character.findSingleById(req.query.id)
        if (result.user != req.userData._id) {
            res.status(403).json({ error: 'Forbidden!' })
        } else {
            res.status(200).json(result)
        }
    } catch(err) {
        res.sendStatus(400)
    }
})

//characters/update
router.put('/update', async (req, res) => {
    try{
        const char = req.body.character
        var oldchar = await Character.findById(char._id)
        if (oldchar.user == req.userData._id) {
            await Character.findByIdAndUpdate(char._id, char)
            res.status(201).json('success')
        }
    } catch(err) {
        res.sendStatus(400)
    }
})
//characters/create
router.post('/create', async (req, res) => {
    try{
        const char = req.body.character
        const newChar = new Character(char)
        newChar.user = req.userData._id
        const result = await newChar.save()
        res.status(201).json(result)
    } catch(err) {
        res.sendStatus(400)
    }

})

module.exports = router