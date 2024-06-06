const pool = require('./db/koneksi');

pool.query('SELECT 1 + 1 AS result', (err, res) => {
    if (err) {
        console.error('Database connection error', err.stack);
    } else {
        console.log('Database connected');
        console.log(res.rows[0])
    }
});
