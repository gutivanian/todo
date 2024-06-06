const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();



// Konfigurasi koneksi ke database cloud PostgreSQL
const pool = new Pool({
    // user: "avnadmin",
    // password: "AVNS_kQjt9nbOqz_yQpoyF_i",
    // host: "pg-2478cf60-fondofne-todo.f.aivencloud.com",
    // port: 11102,
    // database: "defaultdb",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    // ssl: {
    //     rejectUnauthorized: true,
    //     ca: fs.readFileSync('./ca.pem').toString(), // Ganti dengan path ke file sertifikat Anda
    // },
});

// Contoh query untuk mendapatkan versi PostgreSQL
pool.query("SELECT VERSION()", (err, res) => {
    if (err) {
        console.error('Connection error', err.stack);
        return;
    }
    console.log('Connected to PostgreSQL, version:', res.rows[0].version);
    pool.end(err => {
        if (err) {
            console.error('Disconnection error', err.stack);
        }
    });
});
