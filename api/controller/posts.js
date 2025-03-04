import moment from 'moment/moment.js';
import {db} from '../connection.js'
import jwt from "jsonwebtoken";

// export const getPosts = (req, res) => {
//   const userid = req.body.userid

//   const token = req.cookies.accessToken;
//   if(!token)return res.status(401).json("Not logged in")
//     jwt.verify(token, "secretkey", (err, userInfo)=>{
//   console.log(userInfo)
//   if(err) return res.status(403).json("Token is not valid")
//     const q = userid?`SELECT p.*, u.id AS userid, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid)
//     WHERE p.userid=?`: `SELECT p.*, u.id AS userid, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userid)
//    LEFT JOIN relationship AS r ON (p.userid = r.followedUserId) WHERE r.followerUserId=? OR p.userid=? ORDER BY p.createdAt DESC`;
//    const values = [userid? userid: userInfo.id, userInfo.id]

//     db.query(q,values , (err, data) => {
//       if (err) return res.status(500).json(err);

//       return res.status(200).json(data);
//     });


//   });

  
// };
export const getPosts = (req, res) => {
  const userid = req.body.userid;

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    // Use different queries based on whether a specific user ID is provided
    const q = userid
      ? `SELECT p.*, u.id AS userid, name, profilePic FROM posts AS p
         JOIN users AS u ON (u.id = p.userid)
         WHERE p.userid = ?`
      : `SELECT p.*, u.id AS userid, name, profilePic FROM posts AS p
         JOIN users AS u ON (u.id = p.userid)
         LEFT JOIN relationship AS r ON (p.userid = r.followedUserId)
         WHERE r.followerUserId = ? OR p.userid = ?
         ORDER BY p.createdAt DESC`;

    const values = userid ? [userid] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(data);
    });
  });
};


export const addPost = (req, res)=>{
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    console.log(userInfo);
    if (err) return res.status(403).json("Token is not valid");
    const q = "INSERT INTO posts (`desc`, `img`, `userid`, `createdAt`) VALUE (?,?,?,?)";
    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("post created");
    });
  });


}


export const deletePost = (req, res)=>{
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    console.log(userInfo);
    if (err) return res.status(403).json("Token is not valid");
    const q = "DELETE FROM posts WHERE id = ? AND userid = ?";
    const values= [
      req.params.id,
      userInfo.id
      
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if(data.affectedRows>0)return res.status(200).json("post deleted");
      return res.status(403).json("you can only delete your post")
    });
  });


}