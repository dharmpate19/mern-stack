const mongoose = require("mongoose");


const dbConnect = async () => {  
    try {
        const connect = await mongoose.connect(process.env.URI);
        console.log("DB Connected");
    } catch(err) {
        console.log("Error : ", err);
        process.exit(1)
    }
   
}
module.exports = dbConnect;
