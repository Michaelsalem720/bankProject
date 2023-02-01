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

router.put('/:id', (req, res, next) => {
    let sql = `SELECT * FROM accounts`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

router.post('/:id', (req, res, next) => {
    console.log('req.body.cookie; ', req.body.cookie);
    let token = req.body.cookie.split("=")[1];
    let sql = `SELECT account_number AS account 
    FROM accounts 
    JOIN people ON accounts.user_id = people.id 
    JOIN secure_data ON secure_data.user_id = people.id 
    WHERE secure_data.token = '${token}'     
    AND people.id = ${req.params.id}
    AND deleted = 0`
    console.log('sql', sql);
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
        console.log(result);
    })
});

module.exports = router;