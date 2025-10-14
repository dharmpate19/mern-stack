const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please add the Contact Name"]
    },
    email : {
        type : String,
        required : [true, "Please add the Contact email address"],
    },
    phone : {
        type : String,
        required : [true, "Please add the Contact Phone number"]
    }
}, {
    timestamps :  true
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;