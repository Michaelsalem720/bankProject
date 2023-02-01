const { table } = require('console');
var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let con = require('../DB/con')


router.get('/', (req, res, next) => {
    let sql = `SELECT * from people`;
    // .id FROM people JOIN passwords ON people.id = passwords.user_id
    // WHERE deleted = 0 AND username = '${username}' AND password = '${password}'`
    con.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        res.json(result)
    })
});

module.exports = router;