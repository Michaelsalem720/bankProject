const express = require('express');
const router = express.Router();
const con = require('../DB/con')

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