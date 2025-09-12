const mongoose= require("mongoose")

const dbConnect=()=>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/Movie_ticket_Booking_App');
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
}
dbConnect()
module.exports=mongoose;