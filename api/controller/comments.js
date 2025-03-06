import { db } from "../connection.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import "dotenv/config";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userid, name, profilePic FROM comment AS c JOIN users AS u ON (u.id = c.userid)
     WHERE  c.postid=? ORDER BY c.createdAt DESC`;

  db.query(q, [req.query.postid], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};



export const addComments = (req, res)=>{


  const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      console.log(userInfo);
      if (err) return res.status(403).json("Token is not valid");
 
    const q = "INSERT INTO comment (`desc`,`userid`, `postid`, `createdAt`) VALUE (?,?,?,?)";
    const values = [
      req.body.desc,
         userInfo.id,
      req.body.postid,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("comment has been created");
    });
 

  })

}

export const getCommentsCount = (req, res) => {
  const q = `SELECT COUNT(*) AS count FROM comment WHERE postid = ?`;

  db.query(q, [req.query.postid], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]); // Returns { count: <number> }
  });
};

