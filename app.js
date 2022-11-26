const express = require("express");
const app = express();
const mongoose= require("mongoose");
app.use(express.json());


const mongoUrl= "mongodb+srv://sujata:sujata@cluster0.nebyyvu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{console.log("connected to database");
})
.catch((e)=>console.log(e));

app.listen(5000, () => {
    console.log("Server Started");
});
app.post("/post", async(req, res) => {
console.log(req.body);
const { data } =req.body;
try{
if(data =="sujata"){
    res.send({status:"ok"});
}else{
    res.send({status:"User not found"});
}

} catch(error) {
    res.send({status:"something went wrong"});
}
});