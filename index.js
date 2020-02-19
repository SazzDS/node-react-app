const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = `SELECT sl_user, email_id FROM user`;

const connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'laneblaq_db'
})

connection.connect(err => {
	if (err) {
		return err;
	}
})

console.log(connection);

app.use(cors());

app.get('/', (req, res) => {
	res.send(`Hello From Homepage.`);
});

app.get('/addNew', (req, res) => {
	const { email_id, sl_user } = req.query;
	const INSERT_PRODUCTS_QUERY = `INSERT INTO user(sl_user, email_id) VALUES( '${sl_user}', '${email_id}' )`;
	connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send("User Added Successfully");
		}
	})
});

app.get('/getList', (req, res) => {
	connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
		if (err) {
			return res.send(err);
		} else {
			res.json({
				data: results
			})
		}
	})
});

app.listen(4000, () => {
	console.log(`Products Server listening on port 4000`);
});