const { Router } = require('express')
const passport = require('passport')
const { generateToken } = require('../../utils/jwt')

const router = Router()



router.get('/failregister', async (req, res) => {
    console.log('fallo la estragia')
    res.send({status: 'error', error: 'fallo estrategia'})
})

router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister'}), async (req, res) => {
    res.send({status: 'success', message: 'usuario registrado'})
})


router.get('/failogin', async (req, res) => {
    console.log('fallo la estragia')
    res.send({status: 'error', error: 'fallo el login'})
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/failogin'}), async (req, res) => {
    if(!req.user) return res.status(401).send({status: 'error', error: 'credenciales inválidas'})

     const token = generateToken({id: req.user._id, role: req.user.role })


    res.cookie('token', token, {
        maxAge:1000 *60* 60 *24,
        httpOnly: true
    })
    .send({
        status: 'success', 
        message: 'usuario logueado',
        dataUser: req.user.email,
        token})
})



router.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => {
        res.send({
            dataUser: req.user,
            message:'datos sensibles'
        })
})

router.post('/logout', (req, res) => {
    res.send("logout")
})

module.exports = router