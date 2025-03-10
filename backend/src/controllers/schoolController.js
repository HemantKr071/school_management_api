import pool from "../config/db.js";
import {z} from 'zod';
import { schoolSchema,querySchema } from "../schema/validateSchoolSchema.js";

// Add School
export const addSchool = async (req, res) => {
  
    try {
    // Validate request body
    const parsedData = schoolSchema.parse(req.body);
    const { name, address, latitude, longitude } = parsedData;

    const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [name, address, latitude, longitude]);

    res.status(201).json({ 
        message: "School added successfully", 
        schoolId: result.insertId 
    });
  
} catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: error.errors 
    });
    }
    console.error("Error adding school:", error);
    
    res.status(500).json({ 
        error: "Internal Server Error" 
    });
  }
};


// List Schools Sorted by Distance
export const listSchools = async (req, res) => {
  try {
    // Validate query parameters
    const parsedQuery = querySchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({ error: parsedQuery.error.errors });
    }

    const { latitude, longitude } = parsedQuery.data;

    const sql = `SELECT *, 
        ST_Distance_Sphere(POINT(longitude, latitude), POINT(?, ?)) AS distance
        FROM schools 
        ORDER BY distance ASC`;
  
    const [schools] = await pool.execute(sql, [longitude, latitude]);  
  

    res.status(200).json(schools);
  } catch (error) {
    console.error("Error listing schools:", error);
    
    res.status(500).json({ 
        error: "Internal Server Error" 
    });
  }
};
