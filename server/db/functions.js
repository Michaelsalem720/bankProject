
const fs = require('fs');
const con = require('./con');
const mysql = require('mysql');

let dbfunctions = {
    createDB: (name) => {
        con.connect(err => {
            if (err) throw err;
            let sql = `CREATE DATABASE ${name};`;
            con.query(sql, function (err, result) {
                if (err) console.log(err);
                console.log(result)
            });
        })
    },
    insertData: (jsonfolder) => {
        con.connect(err => {
            if (err) throw err;
            let sql = `INSERT INTO ${jsonfolder} VALUES (`;
            let values = [];
        });
    },
    createTable: (jsonfolder) => {
        con.connect(err => {
            if (err) throw err;
            let sql = `CREATE TABLE IF NOT EXISTS ${jsonfolder};`;
        })
    },
}

// dbfunctions.createDB('bankData')
