const express=require("express");
const mongoose=require("mongoose");
const contactlist=require('./model')
const app=express();
app.use(express.json())
mongoose.connect("mongodb+srv://ravidurgaprasad:ravi123@cluster0.r0fy2wg.mongodb.net/?retryWrites=true&w=majority").then(()=>
console.log("DB is connected"))
.catch((err)=>{
    console.log("failed to connect",err);
});
app.post('/createcontact',async(req,res)=>{
    const {name,email,phone}=req.body;
    console.log(req.body)
    if (!name || !email || !phone){
        res.status(400);
        throw newerror("all fields are mandatory")
    }
    res.status(201).json({message:"create contact"});
    try{
        const newdata=new contactlist({name,email,phone});
        await newdata.save();
        const contactuse=await contactlist.find();
        return res.send(contactuse);
    }
    catch(err){
        console.log(err.message)
    }
});
app.delete("/deletecontact/:id", async (req, res) => {
    const contactId = req.params.id;
    try {
      const deletedContact = await contactlist.findByIdAndDelete(contactId);
      if (!deletedContact) {
        return res.status(404).send("Contact not found");
      }
      const contactuse1 = await contactlist.find();
      return res.send(contactuse1);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  });

app.get('/',(req,res)=>{
    res.send("HELLO WORLD")
});
app.listen(3000,()=>{
    console.log("server is running")
})