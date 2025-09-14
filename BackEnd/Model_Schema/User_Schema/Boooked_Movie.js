const mongoose= require("../../DetaBase/dbConnect")

const schema= mongoose.Schema({
    name:{type: String, required:true},
    email:{type:String, required:true},
    Seat_No:{type:String},
    Seat_Type:{type:String},
    Show_Time:{type:String}
},{timestamps: true})

const Booked_Movie= mongoose.model("Booked_Movie", schema)

module.exports= Booked_Movie;