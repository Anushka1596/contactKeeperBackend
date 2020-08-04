const express =  require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check , validationResult } = require('express-validator');
const config = require('config')

const  User = require('../models/User');


//@route     POST  api/users
//@desc  Resgister a user
//@access  Public

router.post('/', [check('name' , 'Please add name').not().isEmpty() ,
      check('email' , 'Please include a valid email').isEmail() ,
      check('password' , 'Please enter a pasword with 6 or more characters').isLength({min:6})],
     async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({error: errors.array()});
    }
    const { name , email , password} = req.body;
    try{
      let user = await User.findOne({email})
      if(user){
       return  res.status(400).json({msg:'User already exists'})
      }
      user = new User({name, email ,password})
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password,salt)

      await user.save();
      const payload={
        user:{
          id:user.id
        }
      }
      jwt.sign(payload, config.get('jwtSecret') , {expiresIn: 36000},  (err , token)=>{
        if(err) throw err;
        res.json({token})
      })

    } catch (err){
      console.log(err.message);
      res.send(500).send('Server Error')
    }
  })


module.exports = router;
