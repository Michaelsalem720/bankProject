const { table } = require('console');
var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let con = require('../DB/con')


router.get('/', (req, res, next) => {
    let sql = `SELECT username, password FROM secure_data JOIN people ON people.id = secure_data.user_id`
    con.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        res.json(result)
    })
});
router.get('/all', (req, res, next) => {
    let sql = `SELECT * FROM secure_data JOIN people ON people.id = secure_data.user_id`
    con.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        res.json(result)
    })
});
router.post('/:id', (req, res, next) => {
    console.log('req.cookies', req.cookies);
    let sql = `SELECT * from secure_data WHERE user_id = ${req.params.id}`
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})
module.exports = router;