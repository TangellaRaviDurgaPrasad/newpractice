const mongoose=require("mongoose");
let contactuser=new mongoose.Schema({
        name:{
        type:String,
        required:[true,"please add the contact"]
        
    },
    email:{
        type:String,
        required:[true,"please add the email"],
        unique: true,
    },
    phone:{
        type:String,
        required:[true,"please add the phone"]
    }

})
const contactnumber=mongoose.model("contactnumber",contactuser);
module.exports=contactnumber;