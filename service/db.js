const mongoose=require("mongoose")

// state connection string
mongoose.connect('mongodb://127.0.0.1:27017/taskApp',{useNewUrlParser:true})

const User=mongoose.model('User',{
    email:String,
    name:String,
    password:String,
    task:[]
})


module.exports={
    User
}