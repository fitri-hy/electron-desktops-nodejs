const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

async function initDatabase() {
    try {
        const SQL = await initSqlJs();
        const databasePath = path.join(__dirname, 'database.db');
        const filebuffer = fs.readFileSync(databasePath);
        db = new SQL.Database(new Uint8Array(filebuffer));
        // console.log('Database initialized successfully.');
    } catch (err) {
        // console.error('Error initializing database:', err);
    }
}

function getData() {
    try {
        if (!db) {
            // console.error('Database not initialized.');
            throw new Error('Database not initialized');
        }

        // console.log('Executing query: SELECT * FROM users');
        const res = db.exec("SELECT * FROM users");

        if (!res.length || !res[0]) {
            // console.warn('No results returned from query.');
            return [];
        }
        res[0].values.forEach((row, index) => {
            // console.log(`Row ${index + 1}:`, row);
        });

        return res[0].values;
    } catch (err) {
        // console.error('Error executing query:', err);
        return [];
    }
}

module.exports = { initDatabase, getData };
