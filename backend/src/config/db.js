import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


const db = mysql.createPool(process.env.MYSQL_URL);


console.log("Connected to Database");

export default db;
