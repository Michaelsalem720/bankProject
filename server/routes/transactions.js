var express = require('express');
var router = express.Router();
let con = require('../DB/con')
// let functions = require('../public/javascripts/functions')
// let fs = require('fs')
router.get('/', (req, res, next) => {
    let sql = `SELECT * FROM transactions
    `
    // WHERE deleted = 0
    // AND
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});

router.put('/:id', (req, res, next) => {
    // fs.
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
    let { credit, debit, myAccount, date, foreignAccount, routingNumber, checkNumber } = req.body.data
    let token = req.body.cookie.split("=")[1];
    // if (routingNumber === 102000123) { //deduct from another user
    //     let sql4 = `SELECT COUNT(*) FROM transactions
    //     WHERE account_number = ${ myAccount }
    //     AND check_number = ${ checkNumber || Math.random() }`
    //     con.query(sql4,(err, result) => {
    //         if (err) throw err;
    //         console.log();
    //     })

    //     let sql3 = `INSERT INTO transactions (account_id, credit, debit, date, account_number, routing_number, check_number)
    //     SELECT accounts.id, ${debit || 0} AS credit, ${credit || 0} AS debit, '${date}' AS date, ${myAccount} AS account_number, ${routingNumber} AS routing_number, ${checkNumber || null} AS check_number
    //     FROM secure_data
    //     JOIN accounts ON secure_data.user_id = accounts.user_id
    //     WHERE accounts.account_number = ${foreignAccount}
    //     AND secure_data.token = '${token}'`;
    //     con.query(sql3,(err, result) => {
    //         if (err) throw err;
    //         console.log('result: ',result);
    //         res.status(200)
    //     })
        
    // }


    let sql1 = `SELECT COUNT(*) AS count FROM transactions 
        WHERE account_number = ${ foreignAccount } 
        AND routing_number = ${ routingNumber } 
        AND check_number = ${ checkNumber || Math.random() } `;
    con.query(sql1, (err, result) => {
        if (err) throw err;
        console.log('result: ', result);
        if (result[0].count === 0) {
            let sql2 = `INSERT INTO transactions(account_id, credit, debit, date, account_number, routing_number, check_number)
            SELECT accounts.id, ${ credit || 0 } AS credit, ${ debit || 0 } AS debit, '${date}' AS date, ${ foreignAccount } AS account_number, ${ routingNumber } AS routing_number, ${ checkNumber || null } AS check_number
            FROM secure_data
            JOIN accounts ON secure_data.user_id = accounts.user_id
            WHERE secure_data.user_id = ${ req.params.id }
            AND account_number = ${ myAccount }
            AND secure_data.token = '${token}'`;
            con.query(sql2, (err, result) => {
                if (err) throw err
                res.status(200).json({ message: `$${ credit || debit } posted successfully` })

            })
        }
        else {
            res.status(400).json({ message: 'You have already made this transaction' });
        }
    });
})

// router.get('/:account_id', (req, res, next) => {
//     let sql = `SELECT account_id, credit, debit, date, account_number, routing_number, check_number
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
