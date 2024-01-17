const express= require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const { log } = require("console");
const encrypt=require("mongoose-encryption");
const app=express();
app.use(express.static("public"));
app.use(express.json());
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
mongoose.connect("mongodb://127.0.0.1:27017/minorDB",{useNewUrlParser:true});
const userSchema={
    userType:{type:String,required:true},
    userId:{type:String,required:true},
    passward:{type:String,required:true}
};
mongoose.createConnection("mongodb://127.0.0.1:27017/studentDB",{useNewUrlParser:true});
const userSchema2={
    enrollment:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    semester:{type:String,required:true},
    father_name:{
        type:String,required:true
    },
    date_of_birth:{
        type:Date,required:true
    }
};
mongoose.createConnection("mongodb://127.0.0.1:27017/studentmarks",{useNewUrlParser:true});
const userSchema3={
    Nano_Science:{type:Number,required:true,unique:true},
    FullStack_Development:{type:Number,required:true,unique:true},
    ptrp:{type:Number,required:true,unique:true},
    coe:{type:Number,required:true,unique:true},
    toc:{type:Number,required:true,unique:true}
}
mongoose.createConnection("mongodb://127.0.0.1:27017/feedetails",{useNewUrlParser:true});
const userSchema4={
   curr_semester:{type:String,required:true},
    branch:{type:String,required:true},
    acadmicyear:{type:Number,required:true},
    feeamount:{
        type:Number,required:true
    }
};
mongoose.createConnection("mongodb://127.0.0.1:27017/studentattendence",{useNewUrlParser:true});
const userSchema5={
    name:{type:String,required:true},
    branch:{type:String,required:true},
    sem:{type:String,required:true},
    Nano_Science:{type:Number,required:true},
    FullStack_Development:{type:Number,required:true},
    ptrp:{type:Number,required:true},
    coe:{type:Number,required:true},
    toc:{type:Number,required:true},
    oss:{type:Number,required:true},
    ap:{type:Number,required:true},
    minor1:{type:Number,required:true}
}
const User=new mongoose.model("User",userSchema);
const student_de=new mongoose.model("student_de",userSchema2);
const student_mark=new mongoose.model("student_mark",userSchema3);
const fee_de=new mongoose.model("fee_de",userSchema4);
const stu_att=new mongoose.model("stu_att",userSchema5);
module.exports=User;
module.exports=student_de;
module.exports=student_mark;
module.exports=fee_de;
module.exports=stu_att;
app.get("/",(req,res)=>{
      res.render("home");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/techfest",(req,res)=>{
    res.render("techfest");
})
app.get("/annualsport",(req,res)=>{
    res.render("annualsport");
})
app.get("/elibreary",(req,res)=>{
    res.render("elibreary");
})
app.get("/home",(req,res)=>{
    res.render("home")
})
app.get("/csefaculty",(req,res)=>{
    res.render("csefaculty");
})
app.get("/alumni",(req,res)=>{
    res.render("alumni");
})
app.get("/aboutus",(req,res)=>{
    res.render("aboutus");
})
app.get("/assesment",(req,res)=>{
res.render("assesment");
})
function register(){
app.get("/register",(req,res)=>{
    res.render("register");
})
}
let userDetails;
let details;
let attde;
app.post("/login",async(req,res)=>{
       const usertype=req.body.usertype;
       const username=req.body.userid;
       const pwd=req.body.pwd;
      userDetails= await User.findOne({userId:username});
     if(userDetails.passward===pwd&&userDetails.userType===usertype){
        res.render("acadmic",{userDetails});
     }else{
        res.status(404).send("enter valid information");
     }
});
app.get("/student_details",async(req,res)=>{
    details=await student_de.findOne({enrollment:userDetails.userId});
    res.render("student_details",{details});
})
app.get("/feedetails",async(req,res)=>{
    const feede=await fee_de.findOne({curr_semester:details.semester});
    res.render("feedetails",{feede});
})
app.get("/myattendence",async(req,res)=>{
     attde=await stu_att.findOne({name:details.name});
    res.render("myattendence",{attde});
})
app.get("/registered_sub",(req,res)=>{
    res.render("registered_sub",{attde});
})
app.get("/subjectfaculty",(req,res)=>{
    res.render("subjectfaculty",{attde});
})
app.listen(3000,()=>{
    console.log("app is listening at port 3000");
})
