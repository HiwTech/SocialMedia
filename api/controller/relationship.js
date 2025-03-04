import { db } from "../connection.js";
import jwt from "jsonwebtoken";

// Fetch likes for a post
export const getRelationship = (req, res) => {
  const q = "SELECT followerUserId FROM relationship WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) {
      console.error("Error fetching likes:", err);
      return res.status(500).json("Database error");
    }
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

// Add a like to a post
export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const { userid } = req.body;
    if (!userid) return res.status(400).json("User ID is required");

    const q =
      "INSERT INTO relationship (`followerUserID`, `followedUserId`) VALUES (?, ?)";
    const values = [userInfo.id, userid];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error inserting relationship:", err);
        return res.status(500).json("Database error");
      }
      return res.status(200).json("Followed");
    });
  });
};


// Nofollow
export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "DELETE FROM relationship WHERE `followerUserId` = ? AND `followedUserID` = ?";
    const values = [userInfo.id, req.query.userid];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Error deleting relationship:", err);
        return res.status(500).json("Database error");
      }
      return res.status(200).json("Unfollowed");
    });
  });
};
