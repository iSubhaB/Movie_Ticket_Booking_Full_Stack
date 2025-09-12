const express= require("express")
const CL= require("../Controller/Admin_Controller")
const upload = require("../Configaration_file/upload")

const UC=require("../Controller/User_controller")


const route= express.Router()

route.get("/",(req,res)=>{
    res.json({msg:"hoem route Page"})
})

//Admin Data Work-----------------------------------
route.post("/add-movie",upload.single("poster"), CL.newMovie)
route.get("/all-movies",CL.findAll)
route.delete("/delete",CL.delete)
route.post("/update",CL.update)
route.post("/update/:_id", CL.update)
route.post("/register",CL.admin_register)
route.post("/login",CL.admin_login)



//User Data Work.....................................
route.post("/search",UC.user_search)



module.exports= route