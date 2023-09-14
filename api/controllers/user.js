import { db } from "../connect.js";
import jwt from "jsonwebtoken";
//  it is used when certain http request is done in users.js
// it refers to the actions need to be performed after that request
export const getUser = (req, res) => {
  // TODO
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  // TODO
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not Valid!");

    const q =
      "UPDATE users SET `name`=?,`coverPic`=?,`profilePic`=?,`city`=?,`website`=? WHERE id=?";
    db.query(
      q,
      [
        req.body.name,
        req.body.coverPic,
        req.body.profilePic,
        req.body.city,
        req.body.website,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};
