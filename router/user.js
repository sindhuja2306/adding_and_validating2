const express=require("express");
const bcrypt = require("bcrypt");
const User=require("../models/schema");

const router =express.Router();

router.post('/register',async(req,res)=>{
    const {userName,email,password} = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({message:"All are required"})
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({userName,email,password: hashedPassword});
        await newUser.save();

        res.status(201).json({message:"user registered sucessfully"});
    }catch(err){
        res.status(500).json({message:"server error"})
    }
});

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"})
    }

    try{
        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({message:"user not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          res.status(200).json({ success: true, message: 'Login successful' });
        } else {
          res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

module.exports=router;