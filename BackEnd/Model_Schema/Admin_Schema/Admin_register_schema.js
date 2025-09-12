const mongoose= require("../../DetaBase/dbConnect")

const schema= mongoose.Schema({
    name:{type: String, required:true},
    phone_no: {type:Number, required:true ,unique: true} ,
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true,},
  

},{timestamps: true})

const Reg_model= mongoose.model("admin_register", schema)

module.exports= Reg_model