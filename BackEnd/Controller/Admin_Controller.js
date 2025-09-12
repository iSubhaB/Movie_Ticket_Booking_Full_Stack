const Movie = require("../Model_Schema/Admin_Schema/add_movie_schema");
const admin_data= require("../Model_Schema/Admin_Schema/Admin_register_schema")
const bcrypt= require('bcryptjs')

const Admin_Controller = {
  newMovie: async (req, res) => {
    try {
      const {
        title,
        type,
        language,
        releaseDate,
        totalLikes,
        length,
        rating,
        totalHalls,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Poster file is required",
        });
      }
      const url = req.protocol + "://" + req.get("host") + "/document/";
      
      const newMovie = new Movie({
        poster: url + req.file.filename,
        title,
        type,
        language,
        releaseDate,
        totalLikes,
        length,
        rating,
        totalHalls,
      });

      const savedMovie = await newMovie.save();

      res.status(201).json({
        success: true,
        message: "Movie added successfully",
        data: savedMovie,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to add movie",
        error: error.message,
      });
    }
  },
  findAll:async(req,res)=>{
    try {
      let result= await Movie.find({})
      res.json({msg: "data fetched succesfully",
        movies: result
      })

    } catch (error) {
      console.log(error);
      res.json({error: error.message,
        msg: "Server error"
      })
    }
  },
 delete: async (req, res) => {
  try {
    const { _id } = req.body;
    const result = await Movie.deleteOne({ _id: _id }); 
    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
},

update:async(req,res)=>{
  try {
    const {_id}=req.params;
    const {title,type,language,releaseDate,totalLikes,length,rating,totalHalls}=req.body;
    const result= await Movie.findByIdAndUpdate(_id,{title:title,type:type,language:language,releaseDate:releaseDate,totalLikes:totalLikes,length:length,rating:rating,totalHalls:totalHalls})
     if(result){
            res.json({msg:"Update Succefully"})
        }else{
            res.json({msg: "failed"})
        }
   
  } catch (error) {
    console.log(error);
  }
},

admin_register: async (req,res)=>{
  try {
    const {name,phone_no,email,password,conf_password}=req.body;
const salt = bcrypt.genSaltSync(10);
const encript = bcrypt.hashSync(password, salt);

   const newData= new admin_data({
        name:name,
        phone_no:phone_no,
        email:email,
        password:encript,
    })
    const result= await newData.save();
    res.json({msg:" Register Succesfully ",
              data: result
    })} catch (error) {
    console.log(error);
    res.json({msg:" server error", error: error.message})
  }
},

admin_login: async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await admin_data.findOne({ email: email }); 
    if (!result) {
      return res.json({ msg: "User not Found. Please register first" });
    }
    const chk1 = await bcrypt.compare(password, result.password); 
    if (chk1) {
      res.json({
        msg: "Login successful",
        user: result
      });
    } else {
      res.json({ msg: "Incorrect password" });
    }

  } catch (error) {
    console.log(error);
    res.json({ msg: "Server error", error: error.message });
  }
}

};
 
module.exports = Admin_Controller;
