const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
});

function initializeDatabase() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log(`Connected as id ${connection.threadId}`);

        connection.query('SHOW DATABASES LIKE "fyp_db"', (err, results) => {
            if (err) {
                console.error('Error checking database existence:', err);
                connection.release();
                return;
            }

            if (results.length === 0) {
                connection.query('CREATE DATABASE fyp_db', (err) => {
                    if (err) {
                        console.error('Error creating database:', err);
                        connection.release();
                        return;
                    }
                    console.log('Database fyp_db created successfully');

                    connection.query('USE fyp_db', (err) => {
                        if (err) {
                            console.error('Error selecting database:', err);
                            connection.release();
                            return;
                        }

                        const createCredTableQuery = `
                            CREATE TABLE IF NOT EXISTS cred (
                                name VARCHAR(100) NOT NULL,
                                password VARCHAR(100) NOT NULL,
                                email VARCHAR(100) PRIMARY KEY,
                                image VARCHAR(255)
                            )
                        `;
                        connection.query(createCredTableQuery, (err) => {
                            if (err) {
                                console.error('Error creating table cred:', err);
                                connection.release();
                                return;
                            }
                            console.log('Table cred created or already exists');
                        });

                        const createConferencesTableQuery = `
                            CREATE TABLE IF NOT EXISTS conferences (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                name VARCHAR(255) NOT NULL,
                                date DATE NOT NULL,
                                speakers TEXT NOT NULL,
                                description TEXT NOT NULL
                            )
                        `;
                        connection.query(createConferencesTableQuery, (err) => {
                            if (err) {
                                console.error('Error creating table conferences:', err);
                                connection.release();
                                return;
                            }
                            console.log('Table conferences created or already exists');
                            connection.release();
                        });
                    });
                });
            } else {
                connection.query('USE fyp_db', (err) => {
                    if (err) {
                        console.error('Error selecting database:', err);
                        connection.release();
                        return;
                    }

                    const createConferencesTableQuery = `
                        CREATE TABLE IF NOT EXISTS conferences (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            date DATE NOT NULL,
                            speakers TEXT NOT NULL,
                            description TEXT NOT NULL
                        )
                    `;
                    connection.query(createConferencesTableQuery, (err) => {
                        if (err) {
                            console.error('Error creating table conferences:', err);
                            connection.release();
                            return;
                        }
                        console.log('Table conferences created or already exists');
                        connection.release();
                    });
                });
            }
        });
    });
}

initializeDatabase();

module.exports = pool;
