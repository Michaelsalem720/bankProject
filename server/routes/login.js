const { table } = require('console');
var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let con = require('../DB/con')


router.post('/', (req, res, next) => {
    console.log(req.body.username);
    let { username, password } = req.body;
    let sql = `SELECT people.id FROM people JOIN passwords ON people.id = passwords.user_id
    WHERE deleted = 0 AND username = '${username}' AND password = '${password}'`
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});


module.exports = router;
