const movielist = require("../Model_Schema/Admin_Schema/add_movie_schema");
const user = require("../Model_Schema/User_Schema/User_register_schema");
const bcrypt = require("bcryptjs");
const  booked=require("../Model_Schema/User_Schema/Boooked_Movie")
const User_Controller = {
  // Search all movies
  user_search: async (req, res) => {
    try {
      const result = await movielist.find({});
      if (result.length > 0) {
        return res.json({
          success: true,
          msg: "Movies Found",
          movies: result,
        });
      } else {
        return res.json({ success: false, msg: "No movies found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, msg: "Server Error" });
    }
  },

  // User Registration
  user_register: async (req, res) => {
    try {
      const { name, phone_no, email, password, address} = req.body;

      // Check if user already exists
      const existingUser = await user.findOne({ email: email });
      if (existingUser) {
        return res.json({ success: false, msg: "Already Registered" });
      }

      // Encrypt password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create new user
      const newUser = new user({
        name: name,
        phone_no: phone_no,
        email: email,
        password: hashedPassword,
        flag: 0,
        address: address,

      });

      const savedUser = await newUser.save();

      // Remove password from response
      const { password: pwd, ...userData } = savedUser._doc;

      return res.json({
        success: true,
        msg: "Registered Successfully",
        user: userData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        msg: "Server Error",
        error: error.message,
      });
    }
  },

  // User Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const existingUser = await user.findOne({ email: email });
      // console.log(existingUser);
      if (!existingUser) {
        return res.json({ success: false, msg: "User not found. Please register first" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) {
        return res.json({ success: false, msg: "Incorrect password" });
      }

      // Remove password from response
      const { password: pwd, ...userData } = existingUser._doc;

      return res.json({
        success: true,
        msg: "Login Successfully",
        user: userData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        msg: "Server Error",
        error: error.message,
      });
    }
  },

  // bookedMovie

 
  bookedMovie:async (req,res)=>{
    try {
      const {name,email,Seat_No,Seat_Type,Show_Time}=req.body;

      const movie=  new booked({
        name:name,
        email:email,
        Seat_No:Seat_No,
        Seat_Type:Seat_Type,
        Show_Time:Show_Time,
      })

      const result=await movie.save()
      if (result){
        res.json({msg: "Succesfull"})
      }
      
    } catch (error) {
     console.log(error); 
     res.json({msg:"Server Error",
             error:error.message
     })
    }
  },
  bookedfetch: async (req, res) => {
  try {
    const { email } = req.body;
    const result = await booked.find({ email: email }); // ✅ use find()
    if (result.length > 0) {
      return res.json({
        success: true,
        msg: "Your Bookings",
        bookings: result,
      });
    } else {
      return res.json({
        success: false,
        msg: "No bookings found for this user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message,
    });
  }
},
deleteBooked:async(req,res)=>{
  try {
    const {email}=req.body;
    const result= await booked.deleteOne({email:email})
    res.json({msg:"deleted"})
    
  } catch (error) {
    console.log(error);
  }
}


};

module.exports = User_Controller;
