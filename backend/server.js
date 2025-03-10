import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import pool from "./src/config/db.js";
import schoolRoutes from "./src/routes/schoolRoutes.js";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const schemaPath = path.join(__dirname, "src/schema/schema.sql");

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL Database");

    
    await connection.query("CREATE DATABASE IF NOT EXISTS school_management");
    console.log("Database Created Successfully");

    
    await connection.query("USE school_management");

    // Execute schema SQL
    if (fs.existsSync(schemaPath)) {
      const schemaSQL = fs.readFileSync(schemaPath, "utf8");
      await connection.query(schemaSQL);
      console.log("Database and tables initialized successfully");
    } else {
      console.error(`Schema file not found at path: ${schemaPath}`);
    }

    connection.release(); 
  } catch (err) {
    console.error("Error initializing database:", err);
  }
})();

// Routes
app.use("/api/v1", schoolRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
