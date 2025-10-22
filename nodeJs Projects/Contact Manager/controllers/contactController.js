const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")
//@Desc Get all Contacts
//@route /api/contacts/
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({user_id : req.user.userId});
    res.status(200).json(contacts)
});


//@Desc Post Contacts
//@route /api/contacts/
const postContact = asyncHandler(async (req,res) => {
    const {name, email, phone} =  req.body;
    

    if(!name || !email || !phone) {
         res.status(400);
         throw new Error("All")
    } else {
        const contact = await Contact.create({
            name, email, phone, user_id : req.user.userId
        })
    res.status(200).json(contact)
    }
});


//@Desc Get Contact
//@route /api/contacts/:id
const getContact = asyncHandler(async (req,res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    };
    if(contact.user_id.toString() !== req.user.userId){
    res.status(403);
    throw new Error("User do not have permission to Delete other user contacts");
    }
    res.status(200).json(contact)
});


//@Desc Edit Contacts
//@route /api/contacts/:id
const putContact = async (req,res) => {
    const {body} = req;
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    };
    if(contact.user_id.toString() !== req.user.userId){
        res.status(403);
        throw new Error("User do not have permission to update other user contacts")
    }
    const contactUpdate = await Contact.findByIdAndUpdate(id, body, {new : true});

    res.status(200).json(contactUpdate)
}


//@Desc Delete Contact
//@route /api/contacts/:id
const deleteContact = asyncHandler(async (req,res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    };
    if(contact.user_id.toString() !== req.user.userId){
        res.status(403);
        throw new Error("User do not have permission to Delete other user contacts")
    }
    const contactDelete = await Contact.findByIdAndDelete(id);

    res.status(200).json(contactDelete)
})

module.exports = {getContacts, postContact, getContact, putContact, deleteContact }