import { db } from "../connect.js";
import jwt from "jsonwebtoken";
export const getRelationships = (req, res) => {
  const q = `SELECT followerUserId FROM relationships WHERE followedUserId=?`;

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

export const addRelationships = (req, res) => {
  const token = req.cookies.accessToken;
  // if token not exist
  if (!token) return res.status(401).json("Not Logged In!");
  // if exist,validate the token
  jwt.verify(token, "secretkey", (err, userInfo) => {
    //userInfo=={id:data[0].id} in auth.js
    // token exist but is not validate
    if (err) return res.status(403).json("Token is not valid!");
    // token exist and is validate
    const q =
      "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
    const values = [userInfo.id, req.body.userId];
    db.query(q, [values], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

export const deleteRelationships = (req, res) => {
  const token = req.cookies.accessToken;
  // if token not exist
  if (!token) return res.status(401).json("Not Logged In!");
  // if exist,validate the token
  jwt.verify(token, "secretkey", (err, userInfo) => {
    //userInfo=={id:data[0].id} in auth.js
    // token exist but is not validate
    if (err) return res.status(403).json("Token is not valid!");
    // token exist and is validate
    const q =
      "DELETE FROM relationships WHERE followerUserId=? AND followedUserId=?";

    db.query(q, [userInfo.id, req.query.userId], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollow");
    });
  });
};
