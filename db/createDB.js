const fs = require('fs');
const initSqlJs = require('sql.js');

async function createDatabase() {
    try {
        // Inisialisasi sql.js
        const SQL = await initSqlJs();

        // Buat instance database baru
        const db = new SQL.Database();

        // Buat tabel 'users'
        db.run(`
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL
            );
        `);
		
		// Tambah data di tabel 'users'
		db.run(`
            INSERT INTO users (name, email) VALUES
            ('Alice', 'alice@example.com'),
            ('Bob', 'bob@example.com'),
            ('Charlie', 'charlie@example.com');
        `);

        // Menyimpan database ke file
        const data = db.export();
        fs.writeFileSync('database.db', new Buffer.from(data));
        console.log('Database and table created successfully!');
    } catch (err) {
        console.error('Error creating database:', err);
    }
}

createDatabase();
