const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : [true, "Please add the User Name"]
    },
    email : {
        type : String,
        required : [true, "Please add the Contact email address"],
        unique : [true, "Email address is already used"],
    },
    password : {
        type : String,
        required : [true, "Please type password"]
    }
}, {
    timestamps :  true
});

const User = mongoose.model("User", UserSchema);

module.exports = User;