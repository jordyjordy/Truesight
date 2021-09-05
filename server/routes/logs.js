import {Router} from 'express'
const router = Router();
import auth from "../config/auth.js"
import {Log} from "../model/log.js"
import {Campaign} from "../model/campaign.js"

router.use(auth)

router.get('/', async(req,res) => {
    var result = await Log.findById(req.query.id)
    res.status(200).json(result)
})

router.post('/create', async(req, res) => {
    const log = req.body.log
    const newLog = new Log(log)
    const result = await newLog.save()
    const campaign = await Campaign.findById(result.campaign)
    campaign.logs.push(result._id)
    await campaign.save()
    res.status(201).json(result)
})

router.put('/update', async(req, res) => {
    var oldLog = await Log.findById(req.body.log._id)
    console.log(oldLog.campaign.users)
    if(oldLog.campaign.users.includes(req.userData._id)) {
        var log = await Log.findOneAndUpdate({_id:req.body.log._id},req.body.log,{new:true})
        res.status(201).json(log)
    } else {
        res.sendStatus(403)
    }
})

router.delete('/delete', async(req,res) => {
    var oldLog = await Log.findById(req.query.id)
    if(oldLog.campaign.users.includes(req.userData._id)) {
        oldLog.remove()
        res.sendStatus(204)
    }
})

export const logs = router