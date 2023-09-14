import  {db} from "../connect.js"
import bcrypt from "bcryptjs";//it is used to hash the password
import jwt from "jsonwebtoken";//it is used for maintaining the security ( the post which delete belong to that user only if any other try to delete it, it will generate error)
export const register=(req,res)=>{
    
    

     // Check user if exist
    const query="SELECT * FROM users WHERE username = ?"

    //replace ? with req.body.username value
    db.query(query,[req.body.username],(err,data)=>{
        if(err)return res.status(500).json(err);
        
        if(data.length) return res.status(409).json("User already exists");
        
        
        // if not exists create a new user
         //hash the password(12345=>jsdhfpasjefinoqo)
      const salt=bcrypt.genSaltSync(10);//generate salt
      const hashedPassword=bcrypt.hashSync(req.body.password,salt);//used to generate the encrypt(hash) password
    
      const q="INSERT INTO users(`username`,`email`,`password`,`name`) VALUES (?)" ;
      const values=[req.body.username,req.body.email,hashedPassword,req.body.name];
      db.query(q,[values],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      })
    })

    

      

}

export const login=(req,res)=>{

  const q="SELECT * FROM users WHERE username=?"
  db.query(q,[req.body.username],(err,data)=>{
    if(err) return res.status(500).json(err);//it is server error
    if(data.length==0)return res.status(404).json("User not found");

    const checkPassword= bcrypt.compareSync(req.body.password,data[0].password);

    if(!checkPassword) return res.status(400).json("Invalid password or username");

    const token=jwt.sign({id:data[0].id},"secretkey");

    const {password,...others}=data[0];



    // when logged in ,cookie is generated and only the actual logged in user can get it not the random one
    res.cookie("accessToken",token,{
      httpOnly: true,
    }).status(200).json(others);
  });
};

export const logout=(req,res)=>{
    
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("User has been logged out!");
}
