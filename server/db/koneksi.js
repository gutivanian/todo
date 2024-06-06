const { Pool } = require('pg');
const fs = require('fs');

// Konfigurasi koneksi ke database cloud PostgreSQL
const pool = new Pool({
    user: "avnadmin",
    password: "AVNS_kQjt9nbOqz_yQpoyF_i",
    host: "pg-2478cf60-fondofne-todo.f.aivencloud.com",
    port: 11102,
    database: "todos",
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./db/ca.pem').toString(), // Path ke file sertifikat di folder db
    },
});

// Contoh query untuk mendapatkan versi PostgreSQL
pool.query("SELECT VERSION()", (err, res) => {
    if (err) {
        throw err;
    }
    console.log(res.rows[0].version);
});

module.exports = pool;
