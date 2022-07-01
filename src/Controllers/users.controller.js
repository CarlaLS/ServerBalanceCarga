const usersController = {};

const passport= require('passport')
const User = require('../models/User')



usersController.renderSingUpForm = (req, res) => {
    res.render ('users/signup')


};

usersController.signup = async (req, res) => {
    const errors =[];
    const {name, email, password, confirmPassword } = req.body;
    if(password != confirmPassword){
        errors.push ({text: 'Las contraseñas no coinciden'})
       
    }
    if(password.length <4 ){
        errors.push({text:'La contraseña debe tener más de 4 caracteres'})
    }
    if(errors.length > 0) {
        res.render('/users/signup' ,{
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    } else {
        const emailUser= await User.findOne({email: email })
        if(emailUser) {
            req.flash('mensaje_error', 'El email ya está registrado');
            res.redirect('/users/signup');
        } else {
            const newUser =new User ({name, email, password});
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('mensaje_satisfactorio', `Bienvenido/a ${name}`)
            res.redirect('/users/signin');
        }
    }
    
};


usersController.renderSignInForm = (req, res) => {
    res.render ('users/signin')
};

usersController.signin = passport.authenticate('local', {
    failureRedirect:'/users/signin',
    successRedirect:'/productos',
    failureFlash: true
})


usersController.logout =async (req, res )=> {
    
   
    await req.logout((err) => {
       
        if (err) return next(err);
    req.flash("mensaje_satisfactorio", 'Hasta Luego');
    res.redirect("/users/signin");
    });
}


module.exports =usersController