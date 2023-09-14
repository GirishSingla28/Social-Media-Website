import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import relationshipRoutes from "./routes/relationships.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);//use to send cookies when user logged in
  next(); //contine the operations
});
// the below is used to send the json object to register,login.js
app.use(express.json());
// this below is used for security purpose(like if someone try to open the webpage with another api it generate error,or the post which delete belong to that user only if any other try to delete it, it will generate error)
app.use(
  cors({//mentioning client url
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

// the below part is used for uploading file to the server(part-1)
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// upload folder  mai file send karna
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen(8800, () => {
  console.log("API Working!");
});
