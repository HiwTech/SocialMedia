import {db} from '../connection.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser'

export const register = (req, res) => {
// check user exists

const q = "SELECT * from users WHERE username = ?"
 db.query(q, [req.body.username], (err, data) => {
   if (err) return res.status(500).json(err);

   if (data.length) return res.status(409).json("user already exists");

   // create a new user
   // hash password
   const salt = bcrypt.genSaltSync(10);
   const hashedPassword = bcrypt.hashSync(req.body.password, salt);
   const value = [
     req.body.username,
     req.body.email,
     hashedPassword,
     req.body.name,
   ];
   
   const q = "INSERT INTO users (username,email,password,name) VALUE (?)"
   db.query(q, [value], (err, data)=>{
    if (err) return res.status(500).json(err);
    return res.status(200).json("user has been created")
   
   });

 });

};

export const login = async (req, res) => {
  try {
    // Check if the user exists
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], async (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found");

      // Compare the password
      const validPassword = await bcrypt.compare(
        req.body.password,
        data[0].password
      );
      if (!validPassword)
       
        return res.status(400).json("Wrong password");

      // Generate JWT
      const token = jwt.sign({ id: data[0].id }, "secretkey");

      // Exclude the password from the response
      const { password, ...others } = data[0];

      // Set cookie and send response
      res.cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    });
  } catch (err) {
    res.status(500).json("Server error");
  }
};



// export const logout = (req, res) => {
//   res.clearCookie("accessToken",{
//     secure:true,
//     sameSite:"none"
//   }).status(200).json("user has been successfully logged out");
// };

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true, // Ensure secure cookies for HTTPS
      sameSite: "none", // For cross-origin requests
      httpOnly: true, // Prevent client-side access to cookies
    })
    .status(200)
    .json("User has been successfully logged out");
};

