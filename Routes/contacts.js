const express =  require('express')
const { check , validationResult } = require('express-validator');
const auth = require('../middleware/auth')
const  User = require('../models/User');
const Contact = require('../models/Contact')
const router = express.Router();


//@route     GET  api/contacts
//@desc     Get all user contacts
//@access  Private

router.get('/',auth, async (req, res)=>{
  try{
    const contacts = await Contact.find({user:req.user.id}).sort({date:-1})
    res.json(contacts)
  }catch (e) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//@route     POST  api/contacts
//@desc      Add new contacts
//@access     Private

router.post('/',[auth , check('name', 'Name is required').not().isEmpty()],
  async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({error: errors.array()});
    }
    const {name , email , phone , type} = req.body;
    try{
      const newContact = new Contact({
        name , email , phone , type , user: req.user.id
      })

      const contact = await newContact.save();
      res.json(contact)
    }catch(err){
      console.error(err.message);
      res.status(500).json('Server Error')
    }
})

//@route     PUT  api/contacts/:id
//@desc      Update contacts
//@access     Private

router.put('/:id', auth ,async (req, res)=>{
  const {name , email , phone , type} = req.body;

  //Build contact object
  const contactFields = {};
  if(name) contactFields.name = name;
  if(email) contactFields.email = email;
  if(phone) contactFields.phone = phone;
  if(type) contactFields.type = type;

  try{
    let contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({msg:'Contact not found'});

    //Make sure user own contact
    if(contact.user.toString() != req.user.id){
      return res.status(401).json({msg:'Not Authorized'})
    }
    contact = await Contact.findByIdAndUpdate(req.params.id, {$set:contactFields} , {new: true})
    res.json(contact)
  }catch (err){
    console.error(err.message);
    res.status(500).json('Server Error')
  }
})

//@route     Delete  api/contacts/:id
//@desc      Delete contact
//@access     Private

router.delete('/:id', auth ,async (req, res)=>{
  try{
    let contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({msg:'Contact not found'});

    //Make sure user own contact
    if(contact.user.toString() != req.user.id){
      return res.status(401).json({msg:'Not Authorized'})
    }

    await Contact.findByIdAndRemove(req.params.id)
    res.json({msg:'Contacts Removed'})
  }catch (err){
    console.error(err.message);
    res.status(500).json('Server Error')
  }
})


module.exports = router;
