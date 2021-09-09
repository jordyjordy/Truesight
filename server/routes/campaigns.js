express = require('express')
router = express.Router();
auth = require('../config/auth')
const Campaign = require('../model/campaign')
logs = require('./logs')
router.use(auth)
router.use('/logs',logs)

//campaign
router.get('/', async(req,res) => {
    try {
        var result = await Campaign.findById(req.query.id).populate('logs', ['name', 'session']). populate('characters',['name','cclass'])
        res.status(200).json(result)
    } catch(err) {
        res.sendStatus(400)
    }
})

//campaign/list
router.get('/list', async (req, res) => {
    try{
        var result = await Campaign.findByUser(req.userData._id)
        for (let i = 0; i < result.length; i++) {
            const isDM = {isDM:result[i].DM.toString() === req.userData._id}
            result[i] = {...result[i], ...isDM}
            result[i] = {...result[i]._doc, ...isDM}
        }
        res.status(200).json(result)
    } catch(err) {
        res.sendStatus(400)
    }
})

//campaign/create
router.post('/create', async(req, res) => {
    try{
        const campaign = req.body.campaign
        const newCampaign = new Campaign(campaign)
        newCampaign.DM = req.userData._id
        newCampaign.users = [req.userData._id]
        const result = await newCampaign.save()
        let tadaa = {...result}
        tadaa = {...tadaa._doc, isDM:true}
        res.status(201).json(tadaa)
    } catch(err) {
        res.sendStatus(400)
    }
})

//campaign/update
router.put('/update', async(req, res) => {
    try{
        var oldCampaign = await Campaign.findById(req.body.campaign._id)
        if(oldCampaign.DM.toString() === req.userData._id) {
            var campaign = await Campaign.findOneAndUpdate({_id:req.body.campaign._id},req.body.campaign,{new:true})
            campaign = {...campaign._doc,isDM:true}
            res.status(201).json(campaign)
        } else {
            res.sendStatus(403)
        }
    } catch(err) {
        res.sendStatus(400)
    }
})



router.delete('/delete', async(req,res) => {
    try{
        console.log(req.headers)
        var oldCampaign = await Campaign.findById(req.query.id)
        if(oldCampaign.DM.toString() === req.userData._id) {
            oldCampaign.remove()
            res.sendStatus(204)
        }
    } catch(err) {
        res.sendStatus(401)
    }
})
module.exports = router