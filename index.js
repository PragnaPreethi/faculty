import mysql from 'mysql2' //mysql2 is latst version

import dotenv from 'dotenv'//for gloablly using databas we use .env file to export to servr cloud  
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

//!create table
export async function createTable(table) {
    const createTodosTable = `
    CREATE TABLE IF NOT EXISTS ${table}(
        period INT ,
        day VARCHAR(255) NOT NULL,
        section VARCHAR(255) NOT NULL
    )
`;

    const [result] = await pool.query(createTodosTable);
    //return result
}


//!get all details
export async function getAllnotes(table) {
    const [rows] = await pool.query(`select * from ${table}`)
    return rows
}

// const notes = await getAllnotes()
// console.log(notes)
//!get specific details
export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM employees
    WHERE id = ? 
    `, [id])
    return rows[0]
}//here id is not spciic it changes with user there in where condition we kpt ?
// const note = await getNote(1)
// console.log(note)
//!insert a row--post
//const data = '24CVRA2'

export async function createNote(period, day, section, faculty) {
    const data = faculty
    await createTable(data);
    const arr = ['csea', 'cseb', 'csec']
    const [result] = await pool.query(`
    
    INSERT INTO ${data}(period,day,section)
    select period,'Monday' as day,' cseb ' as section from cseb where monday in('${data}') union all
    select period,'Tuesday' as day,' cseb ' as section from cseb where tuesday in('${data}') union all
    select period,'Wednesday' as day,' cseb ' as Section from cseb where wednesday in('${data}') union all
    select period,'Thursday' as day,' cseb' as Section from cseb where thursday in('${data}') union all
    select period,'Friday' as day,' cseb ' as Section from cseb where friday in('${data}') union all
    select period,'saturday' as day,' cseb ' as Section from cseb where saturday  in('${data}') union all
    
    select period,'Monday' as day,' csec ' as section from csec where monday in('${data}') union all
    select period,'Tuesday' as day,' csec ' as section from csec where tuesday in('${data}') union all
    select period,'Wednesday' as day,' csec ' as Section from csec where wednesday in('${data}') union all
    select period,'Thursday' as day,' csec' as Section from csec where thursday in('${data}') union all
    select period,'Friday' as day,' csec ' as Section from csec where friday in('${data}'); 
 

    `, [period, day, section])
    const val = result.insertId
    // return result//getNote(val)
    return getAllnotes(data);
}

// const result = await createNote(9, 'reddy', 'rr', 89);
// console.log(result);
