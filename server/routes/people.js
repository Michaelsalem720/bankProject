var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let con = require('../DB/con')


router.get('/', (req, res, next) => {
    let sql = "SELECT * FROM people WHERE deleted = 0"
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});

// router.get('/accounts/:id', (req, res, next) => {
//     let sql = `SELECT account_number AS account
//     FROM accounts 
//     JOIN people 
//     ON accounts.user_id = people.id 
//     WHERE deleted = 0
//     AND ${req.params.id} = people.id`
//     con.query(sql, function (err, result) {
//         if (err) {
//             throw err
//         }
//         res.json(result)
//     })
// });

router.get('/sq', (req, res, next) => {
    let sql = "SELECT * FROM security_questions"
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});

// router.get('/sq', (req, res, next) => {
//     let sql = "SELECT * FROM security_questions"
//     con.query(sql, function (err, result) {
//         if (err) {
//             throw err
//         }
//         res.json(result)
//     })
// });
// router.get('/passwords', (req, res, next) => {
//     let sql = "SELECT * FROM passwords"
//     con.query(sql, function (err, result) {
//         if (err) {
//             throw err
//         }
//         res.json(result)
//     })
// });

// router.get('/cookies', (req, res, next) => {
//     let sql = "SELECT * FROM cookies"
//     console.log(req.cookies);
//     con.query(sql, function (err, result) {
//         if (err) {
//             throw err
//         }
//         res.json(result)
//     })
// });
// // router.post('/cookies', (req, res, next) => {

// // })

router.post('/', (req, res, next) => {
    let { firstName, lastName, username, password, password2, email, phone, q1, a1, q2, a2, dob } = req.body;
    let token = Math.random() * Math.pow(10, 17);
    let sql1 = `insert into people (first_name,last_name,username,email,phone,dob,deleted)
    VALUES ('${firstName}','${lastName}','${username}','${email}',${phone},'${dob}',0)`;
    con.query(sql1, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Error inserting data into people table' });
        }
        let id = result.insertId;
        let sql2 = `insert into secure_data (user_id,password,q1,a1,q2,a2,token,permissions)
         VALUES (${id},'${password}', '${q1}','${a1}','${q2}','${a2}', '${token}', 0)`
        con.query(sql2, (err, result) => {
            if (err) {
                return res.status(500).send({ error: 'Error inserting data into secure_data table' });
            }
            let sql3 = `insert into accounts (user_id,account_number,routing_number)
            VALUES (${id},${id + 364179},10200023);`;
            con.query(sql3, (err, result) => {
                if (err) {
                    return res.status(500).send({ error: 'Error inserting data into accounts table' });
                }
                return res.status(200).send({ message: 'User created successfully', userId: id });
            });
        });
    });
});


router.put('/', (req, res, next) => {
    let { username, password } = req.body.data;
    let token = req.body.token;
    let sql = `SELECT people.id FROM people 
    JOIN secure_data ON secure_data.user_id = people.id 
    WHERE people.username = '${username}' AND secure_data.password = '${password}'
    AND deleted = 0;`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(400).json({ message: 'Invalid Credentials' });
        } else {
            let id = result[0].id;
            let sql2 = `UPDATE secure_data SET token = '${token}' WHERE user_id = ${id};`;
            con.query(sql2, (err, result) => {
                if (err) throw err;
                res.status(200).json(id);
            });
        }
    });
});

router.put('/:id', (req, res, next) => {
    let sql = ''
    let id = req.params.id
    let { columnName, info } = req.body.data
    if (columnName === 'password') {
        sql = `UPDATE secure_data SET ${columnName} = '${info}'
        where user_id = ${id} `
    }
    else {
        let str = columnName === 'phone' ? "" : "'"
        sql = `update people SET ${columnName}=${str}${info}${str}
     where id = ${id} `
    }
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    })
});


router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    let sql = `update people set deleted = 1 where id = ${id} `
    con.query(sql, (err, result) => {
        if (err) throw err
        res.send(result);
    })
});




module.exports = router;
