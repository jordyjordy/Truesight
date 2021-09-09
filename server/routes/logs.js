express = require('express')
router = express.Router();
auth = require('../config/auth')
const Campaign = require('../model/campaign')
const Log = require('../model/log')
router.use(auth)

//campaign/logs?id=
router.get('/logs', async(req,res) => {
    try{
        var logs = await Campaign.getSimpleLogs(req.userData.id,req.query.id)
        res.status(200).json(logs.logs)
    } catch(err) {
        res.sendStatus(400)
    }
})

//campaign/log?id=
router.get('/log',async(req,res) => {
    try{
        var log = await Log.findById(req.query.id)
        res.status(200).json(log)
    } catch(err) {
        res.sendStatus(400)
    }
})

//campaign/logs/create
router.post('/create', async(req, res) => {
    try{
        const log = req.body.log
        const newLog = new Log(log)
        const result = await newLog.save()
        const campaign = await Campaign.findById(result.campaign)
        campaign.logs.push(result._id)
        await campaign.save()
        res.status(201).json(result)
    } catch(err) {
        res.sendStatus(400)
    }
})
//campaign/logs/update
router.put('/update', async(req, res) => {
    try{
        var oldLog = await Log.findById(req.body.log._id).populate('campaign')
        if(oldLog.campaign.users.includes(req.userData._id)) {
            var log = await Log.findOneAndUpdate({_id:req.body.log._id},req.body.log,{new:true})
            res.status(201).json(log)
        } else {
            res.sendStatus(403)
        }
    } catch(err) {
        res.sendStatus(400)
    }
})
//campaign/logs/delete
router.delete('/delete', async(req,res) => {
    try{
        var oldLog = await Log.findById(req.query.id).populate('campaign')
        if(oldLog.campaign.users.includes(req.userData._id)) {
            await Campaign.updateOne({_id:oldLog.campaign}, {$pull: {"logs":req.query.id}})
            await oldLog.remove()
            res.sendStatus(204)
        }
    } catch(err) {
        res.sendStatus(400)
    }
})

module.exports = router