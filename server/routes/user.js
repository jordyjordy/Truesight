import Router from 'express'
const router = Router()
import jwt from "jsonwebtoken"
import {User} from "../model/user.js"
import { sendRecoveryEmail } from '../config/sendEmail.js'

router.post('/register', async (req, res) => {
    try {
        let isUser = await User.find({ email: req.body.email })
        if (isUser.length >= 1) {
            return res.status(409).json({
                message: "email already in use"
            })
        }
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        await user.save();
        res.status(201).send()
    }
    catch (err) {
        res.status(400).json({ err: err })
    }
})

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const pass = req.body.password
        const user = await User.findByCredentials(email, pass)
        if (!user) {
            return res.status(401).json({ error: "Wrong credentials" })
        }
        const token = await user.generateAuthToken()
        const longtoken = await user.generateAuthToken()
        res.status(201).json({ user, token, longtoken })
    } catch (err) {
        res.status(400).json({ err: err })
    }
})

router.delete('/logout', async (req, res) => {
    const decoded = jwt.verify(req.headers.token, process.env.SECRET)
    // await User.removeToken(decoded.email, req.headers.token)
    // if (req.headers.longtoken) {
    //     await User.removeToken(decoded.email, req.headers.longtoken)
    // }
    res.status(200).json({ data: "deleted" })
})
router.get('/authenticate', async (req, res) => {
    try {
        //decode the long token
        const longtoken = req.headers.longtoken
        const decoded = await jwt.verify(longtoken, process.env.SECRET);
        const secondsSinceEpoch = Math.round(Date.now() / 1000)
        //if the longtoken has timed out we need to tell the client to reconnect (log in again with credentials)
        if (secondsSinceEpoch - decoded.iat >= process.env.LONG_TOKEN_TIMEOUT) {
            res.status(401).json("Disconnect")
            res.send()
        }
        const user = await User.findOne({ email: decoded.email })
        const token = await user.generateAuthToken()
        req.userData = decoded;
        res.status(201).send(token)
    } catch (err) {
        res.status(400).send()
    }

})

router.post('/requestpasswordreset', async(req,res) => {
    try{
        const email = req.body.email
        const user = await User.findOne({email:email})
        if(!user) {
            res.status(400).send()
        }

        token = jwt.sign({email:email},process.env.RECOVERY_SECRET)
        sendRecoveryEmail(email,token)
        res.status(201).send()
    } catch(err) {

        res.status(400).send()
    }
})

router.post('/passwordreset', async(req, res) => {
    try {
        const decoded = await jwt.verify(req.body.token, process.env.RECOVERY_SECRET)
        const secondsSinceEpoch = Math.round(Date.now() / 1000)
        //the user only has an hour to reset their password
        if (secondsSinceEpoch - decoded.iat >= 3600) {
            throw new Error("Token timed out")
        }
        if(User.updatePassword(decoded.email,req.body.password)) {
            res.status(204).send()
        } else {
            res.status(400).send()
        }
    } catch(err) {
        res.status(400).send()
    }
})
export const user = router