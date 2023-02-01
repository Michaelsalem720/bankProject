var express = require('express');
var router = express.Router();
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

// credit: "",
// debit: "",
// toAccount: "",
// date: "",
// fromAccount: "",
// routingNumber: "",
// checkNumber: ""

router.post('/:id', (req, res, next) => {
    let { credit, debit, myAccount, date, foreignAccount, routingNumber, checkNumber } = req.body
    // let { checkNumber, amount, depositInto, date, accountNumber, routingNumber } = req.body.data;
    console.log(date);
    let token = req.body.cookie.split("=")[1];
    if (routingNumber === 102000123) { }//deduct from another user
    if (checkNumber) {
    }

    let sql2 = `SELECT COUNT(*) AS count FROM transactions 
        WHERE account_number = ${foreignAccount} 
        AND routing_number = ${routingNumber} 
        AND check_number = ${checkNumber}`;
    con.query(sql2, (err, result) => {
        if (err) throw err;
        console.log('result: ', result);
        if (result[0].count === 0) {
            let sql = `INSERT INTO transactions (account_id, credit, debit, date, account_number, routing_number, check_number)
            SELECT accounts.id, ${credit} AS credit, ${debit} AS debit, '${date}' AS date, ${foreignAccount} AS account_number, ${routingNumber} AS routing_number, ${checkNumber || null} AS check_number
            FROM secure_data
            JOIN accounts ON secure_data.user_id = accounts.user_id
            WHERE secure_data.user_id = ${req.params.id}
            AND account_number = ${myAccount}
            AND secure_data.token = '${token}'`;
            con.query(sql, (err, result) => {
                if (err) throw err
                console.log('result: ', result);
                res.status(200).json({ message: `Check ${checkNumber} deposited for $${credit}` })
            })
        }
        else {
            res.status(400).json({ message: 'You have already made this transaction' });
        }
    });
})

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
