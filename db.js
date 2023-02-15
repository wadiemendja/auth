const mysql = require('mysql');
// Database config
const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'WM1234'
});
// database connector
function ConnectToDatabase() {
    con.connect((err) => {
        if (err) console.log(err);
        else console.log('Connected to database !');
    });
}

module.exports = { ConnectToDatabase }