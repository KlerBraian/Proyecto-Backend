const passport = require('passport')
const passportLocal = require('passport-local')
const { createHash, isValidPassword } = require('../utils/validatePassword')
const jwt = require ("passport-jwt")
const { PRIVATE_KEY } = require ('../utils/jwt')
const { UserDaoMongo } = require('../daos/Mongo/userDao.mongo')
const { CartDaoMongo } = require('../daos/Mongo/cartsDao.mongo')
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const LocalStrategy = passportLocal.Strategy

const userMongo = new UserDaoMongo()
const cartMongo = new CartDaoMongo()

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
            let userFound = await userMongo.getBy({email: username})
            if (userFound) return done(null, false)
        
            let newUser = {
                first_name,
                last_name, 
                email: username,
                password: createHash(password)
             }
            if (username === 'braiankler.30@gmail.com' || username === 'fabio-arias@gmail.com') {
            newUser.role = 'admin'
        }

            let result = await userMongo.create(newUser)
            return done(null, result)


        } catch (error) {
            return done('Error al crear un usuario '+ error)
        }
    }))

    
    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async ( username, password, done ) => {
        try {
            const user = await userMongo.getBy({email: username})
            console.log(user)
            if (!user) return done(null, false)

            if(!isValidPassword(password, user.password)) return done(null, false)
          
    
            if (user.cartId) {
                console.log(user.cartId)
                  let cart = await cartMongo.getBy({_id: user.cartId});
                  if (!cart) {
                    newCart = await cartMongo.create({_id : user.cartId})
                  }
            } else {
                // Si el usuario no tiene un cartId, crear un nuevo carrito y asignarlo al usuario
                const newCart = await cartMongo.create();
                user.cartId = newCart._id;  // Asignar el nuevo carrito al usuario
                await user.save(); // Guardar el usuario actualizado con el cartId
            }

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userMongo.getBy({_id: id})
        done(null, user)
    })
}

module.exports = {
    initializePassport
}