// db.js
const { Pool } = require('pg');
require('dotenv').config();

// Tạo Pool để tái sử dụng kết nối, hiệu quả hơn client lẻ
const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  });
  

// Helper: dùng thay cho pool.query trực tiếp (để thống nhất nơi import)
async function query(text, params) {
  return pool.query(text, params);
}

module.exports = { pool, query };
