const express = require('express');
const router = express.Router();
const con = require('../DB/con')

router.get('/', (req, res, next) => {
    let sql = `SELECT * from secure_data`;
    con.query(sql, (err, result) => {
        if (err) {
            return next(new Error('Error retrieving data from database'));
        }
        res.json(result)
    })
});

router.post('/:id', (req, res, next) => {
    console.log('req.cookies', req.cookies);
    let sql = `SELECT * from secure_data WHERE user_id = ${req.params.id}`
    con.query(sql, (err, result) => {
        if (err) return next(new Error('Error retrieving user data from database'));
        res.json(result)
    })
})

module.exports = router;