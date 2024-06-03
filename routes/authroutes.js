const router = require('express').Router();
const mongoose = require('mongoose');
const {User}= require('../model/user');
const passport = require('passport');

router.get('/signup',(req,res)=>{

    if(req.isAuthenticated()){
        res.redirect('/home');
    }
    else{
        res.render('signup');
    }

   
})

router.get('/signin',(req,res)=>{

    if(req.isAuthenticated()){
        res.redirect('/home');
    }
    else{
        res.render('signin');
    }
})

router.post('/signin', passport.authenticate("local", {
    failureRedirect: '/signup',
    failureFlash: true
}), (req, res) => {
    return res.redirect('/home');
});

router.post('/signup',async(req,res)=>{

    const {email,username,password} = req.body;

    const user = await User.findOne({username});

    if(user){
        res.render('signin');
    }
    else{

        await User.create(req.body);

        return res.render('signin');
    }

    



})

module.exports = router;