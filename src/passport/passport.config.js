const passport = require('passport')
const passportLocal = require('passport-local')
const { createHash, isValidPassword } = require('../utils/validatePassword')
const UserDaoMongo = require('../Mongo/userDao.mongo')
const jwt = require ("passport-jwt")
const { PRIVATE_KEY } = require ('../utils/jwt')

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const LocalStrategy = passportLocal.Strategy
const userService   = new UserDaoMongo()

const initializePassport = () => {

    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies) {
            token = req.cookies['token']
        }
        return token
    }

    passport.use ('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]) ,
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done (error)
        }
    }
))

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email' 
    }, async (req, username, password, done)=>{
        const { first_name, last_name } = req.body
        try {
            let userFound = await userService.getUser({email: username})
            if (userFound) return done(null, false)

            let newUser = {
                first_name,
                last_name, 
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            return done(null, result)

            
        } catch (error) {
            return done('Error al crear un usuario '+ error)
        }
    }))

    
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async ( username, password, done ) => {
        try {
            const user = await userService.getUser({email: username})
            if (!user) return done(null, false)

            if(!isValidPassword(password, user.password)) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userService.getUser({_id: id})
        done(null, user)
    })
}

module.exports = {
    initializePassport
}