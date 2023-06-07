//import mongoose
const mongoose=require("mongoose")
//connection string
mongoose.connect("mongodb://localhost:27017/bank_server",{
    useNewUrlparser:true
})


//defining model
const Account=mongoose.model('Account',{
    account_no:Number,
    name:String,
     phone:Number,
     balance:Number,
    password:String,
    transaction:[]
})
module.exports={
    Account
}