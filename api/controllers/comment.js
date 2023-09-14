import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
export const getComments = (req, res) => {
  const q = `SELECT c.*,u.id AS userId,name,profilePic FROM comments AS c JOIN users AS u ON (u.id=c.commentUserId) WHERE c.postId=? ORDER BY c.createdAt DESC`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComments = (req, res) => {
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
      "INSERT INTO comments (`description`,`createdAt`,`commentUserId`,`postId`) VALUES (?)";
    const values = [
      req.body.description,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];
    db.query(q, [values], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created");
    });
  });
};
