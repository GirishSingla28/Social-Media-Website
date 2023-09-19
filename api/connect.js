// connecting the mysql with nodejs 
import mysql from "mysql"

export const db=mysql.createConnection({
    host:"https://socialmediawebsite.onrender.com",
    user:"root",
    password:"password",
    database:"social"
})
