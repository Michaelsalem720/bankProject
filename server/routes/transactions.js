const { table } = require('console');
var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let con = require('../DB/con')


router.get('/', (req, res, next) => {
    let sql = `SELECT * FROM transactions`

    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});

// router.get('/', (req, res, next) => {
//     let sql = `SELECT user_id, routing_number, account_number FROM accounts 
//     JOIN people 
//     ON accounts.user_id = people.id 
//     WHERE deleted = 0`
//     con.query(sql, function (err, result) {
//         if (err) {
//             throw err
//         }
//         res.json(result)
//     })
// });

router.post('/:id', (req, res, next) => {
    let { checkNumber, amount, depositInto, date, accountNumber, routingNumber } = req.body.data;
    console.log(date);
    let token = req.body.cookie.split("=")[1];
    if (routingNumber === 102000123) { }

    let sql = `INSERT INTO transactions (account_id, credit, debit, date, account_number, routing_number, check_number)
    SELECT accounts.id, ${amount} AS credit, 0 AS debit, '${date}' AS date, ${accountNumber} AS account_number, ${routingNumber} AS routing_number, ${checkNumber} AS check_number
    FROM secure_data
    JOIN accounts ON secure_data.user_id = accounts.user_id
    WHERE secure_data.user_id = ${req.params.id}
    AND account_number = ${depositInto}
    AND secure_data.token = '${token}'`
    

    // let sql = `INSERT INTO transactions (account_id, credit, debit, date, account_number, routing_number, check_number) 
    // VALUES ()
    // `
    // let sql = `SELECT people.id FROM people JOIN passwords ON people.id = passwords.user_id
    // WHERE deleted = 0 AND username = '${username}' AND password = '${password}'`
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) throw err
        console.log('result: ', result);
        res.json(result)
    })
});

// router.get('/:account_id', (req, res, next) => {
//     let sql = `SELECT account_id,credit,debit,date,account_number,routing_number,check_number
//      FROM transactions JOIN people
//       WHERE account_id = ${req.params.account_id} AND deleted = 0`
//     con.query(sql, function (err, result) {
//         if (err) {
//             throw err
//         }
//         // res.json(result)
//     });
// });


module.exports = router;
