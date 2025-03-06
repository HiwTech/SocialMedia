
import { db } from "../connection.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
 export const getUser = (req, res) => {
  const userid = req.params.userid;

  const q = "SELECT * FROM users WHERE id=? ";

  db.query(q, [userid], (err, data)=>{
    if(err) return res.status(500).json(err)

      const { password, ...info } = data[0];
      return res.json(info)

  })
  
};


export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "process.env.SECRETKEY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = `
      UPDATE users 
      SET name = ?, city = ?, website = ?, coverpicture = ?, profilePic = ? 
      WHERE id = ?`;

    const values = [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.coverpicture,
      req.body.profilePic,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        // Fetch the updated user and return it
        db.query(
          `SELECT * FROM users WHERE id = ?`,
          [userInfo.id],
          (err, updatedData) => {
            if (err) return res.status(500).json(err);
            const { password, ...info } = updatedData[0]; // Exclude password
            return res.status(200).json(info);
          }
        );
      } else {
        return res.status(403).json("You can only update your own profile.");
      }
    });
  });
};




export const getAllUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "process.env.SECRETKEY", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const currentUserId = userInfo.id; // Extract user ID from token

    const q = "SELECT * FROM users WHERE id != ?";

    db.query(q, [currentUserId], (err, data) => {
      if (err) return res.status(500).json(err);

      // Exclude passwords from the response
      const userInfo = data.map(({ password, ...otherFields }) => otherFields);

      return res.json(userInfo);
    });
  });
};



