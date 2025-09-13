const mongoose= require("../../DetaBase/dbConnect")

const schema= mongoose.Schema({
    name:{type: String, required:true},
    phone_no: {type:Number, required:true ,unique: true} ,
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true,},
    address:{type:String},
    flag:{type:String}
  

},{timestamps: true})

const user_reg_model= mongoose.model("user_register", schema)

module.exports= user_reg_model