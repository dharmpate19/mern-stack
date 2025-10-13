const asyncHandler = require("express-async-handler")
//@Desc Get all Contacts
//@route /api/contacts/
const getContacts = asyncHandler(async (req,res) => {
    res.status(200).json({message : "Get all contacts"})
});


//@Desc Post Contacts
//@route /api/contacts/
const postContact = asyncHandler(async (req,res) => {
    console.log(req.body);
    const {name, email, phone} =  req.body;
    if(!name || !email || !phone) {
         res.status(400);
         throw new Error("All")
    } else {
    res.status(200).json({message : "Post contacts"})
    }
});


//@Desc Get Contact
//@route /api/contacts/:id
const getContact = asyncHandler(async (req,res) => {
    const id = req.params.id;
    res.status(200).json({message : `Get this contact ${id}`})
});


//@Desc Edit Contacts
//@route /api/contacts/:id
const putContact = async (req,res) => {
    const id = req.params.id;
    res.status(200).json({message : `Edit this contact ${id}`})
}


//@Desc Delete Contact
//@route /api/contacts/:id
const deleteContact = asyncHandler(async (req,res) => {
        const id = req.params.id
    res.status(200).json({message : `Delete this contact ${id}`})
})

module.exports = {getContacts, postContact, getContact, putContact, deleteContact }