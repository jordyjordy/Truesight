express = require('express')
router = express.Router();
auth = require('../config/auth')
const Character = require('../model/character')
router.use(auth)

router.get('/', async (req,res) => {
    const result = await Character.findByUser(req.userData._id)
    res.status(200).json(req.userData)
})

router.post('/create', async (req, res) => {
    const char = req.body.character
    try{
        const character = new Character(char)
        let result = await character.save()
        console.log(result + "HI")
        res.status(200).json({message:"success"})
    } catch (err) {
        res.status(400).json({error:err})
    }
    console.log(char)

})

module.exports = router