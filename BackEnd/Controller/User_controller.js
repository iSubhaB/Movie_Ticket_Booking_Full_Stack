const movielist= require("../Model_Schema/Admin_Schema/add_movie_schema")

const User_Controller={
    user_search:async (req,res)=>{
        try {
            const {title}=req.body;
            const result= await movielist.find({title:title})
            if(result.length>0){
                res.json({msg:"Movie Found",
                         movie: result })
            }else{
                 res.json({msg:" Didn't Found"})
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports= User_Controller;