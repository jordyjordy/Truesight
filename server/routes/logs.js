express = require('express')
router = express.Router();
auth = require('../config/auth')
const Campaign = require('../model/campaign')
const Log = require('../model/log')
router.use(auth)

//campaign/logs?id=
router.get('/logs', async(req,res) => {
    var logs = await Campaign.getSimpleLogs(req.userData.id,req.query.id)
    res.status(200).json(logs.logs)
})

//campaign/log?id=
router.get('/log',async(req,res) => {
    var log = await Log.findById(req.query.id)
    res.status(200).json(log)
})

//campaign/logs/create
router.post('/create', async(req, res) => {
    const log = req.body.log
    const newLog = new Log(log)
    const result = await newLog.save()
    const campaign = await Campaign.findById(result.campaign)
    campaign.logs.push(result._id)
    await campaign.save()
    res.status(201).json(result)
})
//campaign/logs/update
router.put('/update', async(req, res) => {
    var oldLog = await Log.findById(req.body.log._id).populate('campaign')
    if(oldLog.campaign.users.includes(req.userData._id)) {
        var log = await Log.findOneAndUpdate({_id:req.body.log._id},req.body.log,{new:true})
        res.status(201).json(log)
    } else {
        res.sendStatus(403)
    }
})
//campaign/logs/delete
router.delete('/delete', async(req,res) => {
    var oldLog = await Log.findById(req.query.id).populate('campaign')
    if(oldLog.campaign.users.includes(req.userData._id)) {
        await Campaign.updateOne({_id:oldLog.campaign}, {$pull: {"logs":req.query.id}})
        await oldLog.remove()
        res.sendStatus(204)
    }
})

module.exports = router