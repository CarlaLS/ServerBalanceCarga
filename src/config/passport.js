const passport = require('passport');
const User = require('../models/User');

const LocalStrategy = require('passport-local').Strategy;




passport.use(new LocalStrategy ({
     usernameField: 'email',
    //  passwordField:'password'

}, async (email, password, done) => {
    
 const user= await User.findOne({email})
 if(! user){
   return done(null, false, {message: 'No se encuentra el usuario'});

 }
    const match =await user.matchPassword(password)
    if(! match)
        return done(null,false, {message: 'Contraseña incorrecta'} )
    
        return done(null, user);
        
    }
 

)
);

passport.serializeUser((user, done) => {
    done(null, user.id)
});


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err,user)
    })
})