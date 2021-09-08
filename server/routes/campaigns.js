express = require('express')
router = express.Router();
auth = require('../config/auth')
const Campaign = require('../model/campaign')
logs = require('./logs')
router.use(auth)
router.use('/logs',logs)

//campaign
router.get('/', async(req,res) => {
    var result = await Campaign.findById(req.query.id).populate('logs', ['name', 'session']). populate('characters',['name','cclass'])
    res.status(200).json(result)
})

//campaign/list
router.get('/list', async (req, res) => {
    var result = await Campaign.findByUser(req.userData._id)
    for (let i = 0; i < result.length; i++) {
        const isDM = {isDM:result[i].DM.toString() === req.userData._id}
        result[i] = {...result[i], ...isDM}
        result[i] = {...result[i]._doc, ...isDM}
    }
    res.status(200).json(result)
})

//campaign/create
router.post('/create', async(req, res) => {
    const campaign = req.body.campaign
    const newCampaign = new Campaign(campaign)
    newCampaign.DM = req.userData._id
    newCampaign.users = [req.userData._id]
    const result = await newCampaign.save()
    let tadaa = {...result}
    tadaa = {...tadaa._doc, isDM:true}
    res.status(201).json(tadaa)
})

//campaign/update
router.put('/update', async(req, res) => {
    var oldCampaign = await Campaign.findById(req.body.campaign._id)
    if(oldCampaign.DM.toString() === req.userData._id) {
        var campaign = await Campaign.findOneAndUpdate({_id:req.body.campaign._id},req.body.campaign,{new:true})
        campaign = {...campaign._doc,isDM:true}
        res.status(201).json(campaign)
    } else {
        res.sendStatus(403)
    }
})



router.delete('/delete', async(req,res) => {
    console.log(req.headers)
    var oldCampaign = await Campaign.findById(req.query.id)
    if(oldCampaign.DM.toString() === req.userData._id) {
        oldCampaign.remove()
        res.sendStatus(204)
    }
})
module.exports = router