import {Router} from "express"
var router = Router();
import auth from "../config/auth.js"
router.use(auth)
import {Spell} from "../model/spell.js"


router.get('/', async (req, res) => {
    res.status(200).json(await Spell.find())

})

router.get('/query', auth, async (req, res) => {
    try {
        res.status(200).json(await Spell.findByName(req.query.searchterms, req.query.page, req.query.editable, req.userData._id))
    } catch (err) {
        res.status(400).send()
    }
})
router.get('/count', auth, async (req, res) => {
    res.status(200).json(await Spell.spellCount())
})

router.get('/get', auth, async (req, res) => {
    var temp = await Spell.findById(req.query.id)
    res.status(200).json(temp)
})
router.put('/update', auth, async (req, res) => {
    try {
        var spell = await Spell.findById(req.body.spell._id)
        if (spell.user === req.userData._id) {
            await Spell.findByIdAndUpdate(req.body.spell._id, req.body.spell)
            res.status(201).send("success")
        } else {
            res.status(403).send()
        }
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})
router.post('/add', auth, async (req, res) => {
    const spell = req.body.spell
    try {
        const spellsave = new Spell(req.body.spell)
        spellsave.user = req.userData._id
        await spellsave.save()
        res.status(200).json({ result: "success" })
    } catch (err) {
        res.status(400).json({ error: err })
        res.send()
    }

})
router.delete('/remove', auth, async (req, res) => {
    try {
        var spell = await Spell.findById(req.query.id)
        if (spell.user === req.userData._id) {
            await Spell.findByIdAndDelete(req.query.id)

            res.status(201).send("success")
        } else {
            throw new Error("not allowed")
        }
    } catch (err) {
        res.status(400).send("something went wrong")
    }
})
export const spells = router