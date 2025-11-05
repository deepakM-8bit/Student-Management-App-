import pool from "../db.js";

//Get all users
export const getUser = async (req,res) => {
    try {
        const result = await pool.query (' SELECT * FROM student ORDER BY id ASC');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({error: err.message});
    }
};

//Add user
export const addUser = async (req,res) => {
    const {name,email,phoneno} = req.body;
    try{
        const result = await pool.query('INSERT INTO student (name, email,phoneno) VALUES ($1,$2,$3) RETURNING *',
            [name,email,phoneno]
        );
        res.json(result.rows[0]);
    }catch(err){
        res.status(500).json({error:err.message});
    }    
};

//Update user
export const updateUser = async (req,res) => {
    const {id} = req.params;
    const {name,email,phoneno} = req.body;

    try{
        const result = await pool.query('UPDATE student SET name=$1, email=$2, phoneno=$3 WHERE id=$4 RETURNING *',
            [name,email,phoneno,id]
        );
        console.log(req.body);
        res.json(result.rows[0]);       
    }catch(err){
        res.status(500).json({errro:err.message});
    }
};

//Delete user
export const deleteUser = async (req,res) => {
    const {id} = req.params;
    try{
        const result = await pool.query('DELETE FROM student WHERE id=$1',[id]);
        res.json({message:'student deleted'});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};