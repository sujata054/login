const express = require("express");
const app = express();
const mongoose= require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

const jwt= require("jsonwebtoken");
const JWT_SECRET= "123456789123456789"; 


const mongoUrl= "mongodb+srv://sujata:sujata@cluster0.nebyyvu.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,{
    useNewUrlParser:true
})
.then(()=>{
    console.log("connected to database");
})
.catch((e)=>console.log(e));

require("./userDetails")
const User=mongoose.model("UserInfo");

app.post("/register",async(req, res)=>{
    const { fname, lname, email, password } = req.body;

    const encryptedPassword= await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
           return res.send({ error: "User Exists"});
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,

    });
        res.send({ status: "ok"});

    }catch (error) {
        res.send({ status: "error"});

    }
});
app.post("/login" , async(req,res)=>{
    const { email, password } =req.body;
    const user= await User.findOne({ email });
    if (user==null) {
        return res.send({ error: "User not found"});
     }
     if(await bcrypt.compare(password,user.password)){
        const token= jwt.sign({}, JWT_SECRET);

        if(res.status(201)){
            return res.json({status: "ok", data: token});
        }else{
            return res.json({status: "error"});
        }
     }
     res.json({ status: "error", error: "Invalid Password"});
 });
 app.post("/userData",async(req,res)=>{
    const {token} =req.body;
    try{
        const user=jwt.verify(token, JWT_SECRET);
        const useremail =user.email;
        User.findOne({ mail: useremail})
        .then((data)=>{
            res.send({status: "ok" , data});
        })
        .catch((error) => {
            res.send({ status: "error", data:error});
        });

    } catch(error) {

    }
 }) ;
app.listen(5000, () => {
    console.log("Server Started");
});


/*app.post("/post", async(req, res) => {
console.log(req.body);
const { data } = req.body;

try {
  if (data =="sujata"){
    res.send({status:"ok"});
   } else {
    res.send({status: "User not found" });
}
} catch (error) {
    res.send({ status: "something went wrong" });
}
});

require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
    const { name, email, mobileNo } = req.body;
    try{
        await User.create({
            uname: name,
            email,
            phoneNo: mobileNo,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});
*/

