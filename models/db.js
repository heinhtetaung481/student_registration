import mysql from 'mysql2/promise'
import dbConfig from '../config/db.config.js'

const env = process.env

const pool = mysql.createPool({
    host: env.DB_HOST || dbConfig.HOST,
    user: env.DB_USER || dbConfig.USER,
    password: env.DB_PASSWORD || dbConfig.PASSWORD,
    database: env.DB_NAME || dbConfig.DB,
    waitForConnections: true,
    connectionLimit: env.DB_CONN_LIMIT || 2,
    queueLimit: 0,
    debug: env.DB_DEBUG || false
})

async function query(sql, params) {
    const [rows, fields] = await pool.execute(sql, params)
    return rows
}

// connection.connect(error => {
//     if (error) throw error
//     console.log("Successfully connected to the database.")
// })
const connection = {
    query
}

export default connection