const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PLAYERS_QUERY = 'SELECT * FROM players';

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'fantasydb'
});

connection.connect(err => {
    if (err) {
        return err;
    }
});

app.use(cors());

app.listen(4000, () => {
    console.log('server listening on port 3000')
});

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/players', (req, res) => {
    connection.query(SELECT_ALL_PLAYERS_QUERY, (err, results) => {
        return checkQuery(res, err, results)
    })
});

app.get('/players/add', (req, res) => {
    const { name, pid } = req.query;
    const INSERT_PLAYER_QUERY = `INSERT INTO players (name, pid) VALUES ('${name}', '${pid}')`;
    connection.query(INSERT_PLAYER_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        } else {
            return res.send(`added '${name}'`)
        }
    });
});

/*
app.get('/players/createdb', (req, res) => {
    const dbquery = 'CREATE DATABASE fantasydb';
    connection.query(dbquery, (err, results) => {
        return checkQuery(res, err, results)
    });
});

app.get('/players/createtable', (req, res) => {
    const { tname } = req.query;
    const dbquery = `CREATE TABLE '${tname}'`;
    connection.query(dbquery, (err, results) => {
        return checkQuery(res, err, results)
    });
});
*/

function checkQuery(res, err, results) {
    if (err) {
        return res.send(err)
    }
    else {
        return res.json({
            data: results
        })
    }
};