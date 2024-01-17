const express= require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const { log } = require("console");
const encrypt=require("mongoose-encryption");
const app=express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
mongoose.connect("mongodb://127.0.0.1:27017/userDB",{useNewUrlParser:true});
const userSchema={
    userId:String,
    passward:String
};
const User=new mongoose.model("User",userSchema);
app.get("/",(req,res)=>{
      res.render("home");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.listen(3000,()=>{
    console.log("app is listening at port 3000");
})
