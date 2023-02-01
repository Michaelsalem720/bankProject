var express = require('express');
var router = express.Router();

let con = require('../DB/con')

router.get('/', (req, res, next) => {
    let sql = `SELECT * FROM accounts`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

router.get('/:id', (req, res, next) => {
    console.log('req.cookies', req.cookies);
    let token = req.cookies.token;
    console.log('Token:', token);
    console.log('req.cookies', req.cookies);
    let sql = `SELECT account_number AS account FROM accounts JOIN people 
        ON accounts.user_id = people.id 
    WHERE people.id = ${req.params.id}
    AND deleted = 0`
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
});

module.exports = router;