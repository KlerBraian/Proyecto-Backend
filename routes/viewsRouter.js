const { Router } = require('express');
const router = Router()


router.get("/" , (req, res) => {
    try {
        res.render("home")
    }
    catch(error) {
        console.log(error)
    }
})

router.get('/realtimeproducts', (req, res)=>{
    try {
        res.render ("realTimeProducts")
    } catch (error) {
        console.log (error)
    }
})

module.exports = router