import  express  from "express";
import  {getUser,updateUser}  from "../controllers/user.js";

const router = express.Router();
// getUser function will get the action need to be performed after get request
router.get("/find/:userId",getUser)
router.put("/",updateUser);

export default router;