// server.js
// ... (previous code)
require("dotenv").config();
const sql = require('mssql');

function ConnectToMSSQL(){

    // console.log(process.env.DB_DATABASE_NAME);
    const config = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_DATABASE_NAME,
        options: {
            encrypt: true,
            trustServerCertificate: true, // Trust self-signed certificate
          },
      };
    
    
    //   sql.connect(config, (err) => {
    //     if (err) {
    //       console.error('Error connecting to SQL Server:', err);
    //     } else {
    //       console.log('Connected to SQL Server');
    //     }
    //   });

    const pool = new sql.ConnectionPool(config);
    const poolConnect = pool.connect();

    poolConnect
        .then(() => console.log('Connected to SQL Server'))
        .catch((err) => console.error('Error connecting to SQL Server:', err));

    // Close the SQL Server connection when the Node.js process is terminated
    process.on('SIGINT', async () => {
        try {
        await pool.close();
        console.log('Disconnected from SQL Server');
        process.exit(0);
        } catch (error) {
        console.error('Error closing SQL Server connection:', error);
        process.exit(1);
        }
    });

    return pool;
}
  
module.exports = {ConnectToMSSQL};
