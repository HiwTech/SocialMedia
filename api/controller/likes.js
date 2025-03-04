import { db } from "../connection.js";
import jwt from "jsonwebtoken";

// Fetch likes for a post
export const getLikes = (req, res) => {
  const q = "SELECT userid FROM likes WHERE postid = ?";

  db.query(q, [req.query.postid], (err, data) => {
    if (err) {
      console.error("Error fetching likes:", err);
      return res.status(500).json("Database error");
    }
    return res.status(200).json(data.map((like) => like.userid));
  });
};

// Add a like to a post
export const addLikes = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "INSERT INTO likes (`userid`, `postid`) VALUES (?, ?)";
    const values = [userInfo.id, req.body.postid];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error inserting like:", err);
        return res.status(500).json("Database error");
      }
      return res.status(200).json("Post has been liked");
    });
  });
};

// Remove a like from a post
export const deleteLikes = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "DELETE FROM likes WHERE `userid` = ? AND `postid` = ?";
    const values = [userInfo.id, req.body.postid];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error deleting like:", err);
        return res.status(500).json("Database error");
      }
      return res.status(200).json("Post like has been removed");
    });
  });
};
