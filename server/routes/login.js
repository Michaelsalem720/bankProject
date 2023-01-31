const { table } = require('console');
var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let con = require('../DB/con')


router.post('/', (req, res, next) => {
    let { username, password } = req.body;
    let sql = `SELECT people.id FROM people JOIN passwords ON people.id = passwords.user_id
    WHERE deleted = 0 AND username = '${username}' AND password = '${password}'`
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});
router.post('/', (req, res, next) => {
    let { data, Cookie } = req.body;
    console.log('Cookie: ', Cookie);
    console.log('data: ', data);
    let sql = `SELECT id FROM people
    JOIN passwords 
        ON people.id = passwords.user_id
    WHERE username = '${data.username}' AND password = '${data.password}' AND deleted =0`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.length);
        if (result.length === 0) {
            res.json({
                status: 0,
            });
        } else {
            res.json({
                status: 1,
                id: result[0].id
            });
        }
    })
    // let sql = `SELECT * FROM people`
    //  JOIN passwords ON people.id = passwords.user_id
    // WHERE username = '${username}' AND password = '${password}' AND deleted = 0`
    // con.query(sql, function (err, result) {
    //     if (err) {
    //         throw err
    //     }
    //     res.json(result)
    // })
});


module.exports = router;

// router.post('/', (req, res, next) => {
//     let { firstName, lastName, username, password, password2, email, phone, q1, a1, q2, a2, dob } = req.body.userInfo;
//     let sql1 = `insert into people (first_name,last_name,username,email,phone,dob,deleted)
//     VALUES ('${firstName}','${lastName}','${username}','${email}',${phone},'${dob}',0)`;
//     // console.log('sql1: ', sql1);
//     con.query(sql1, (err, result) => {
//         if (err) throw err;
//         let id = result.insertId;
//         let sql2 = `insert into passwords (user_id,password)
//          VALUES (${id},'${password}')`;
//         // console.log('sql2: ', sql2);
//         con.query(sql2, (err, result) => {
//             if (err) throw err;
//             // res.send(result);
//         });
//         let cookieStr = req.body.Cookie;
//         let [nameValue, expValue, path] = cookieStr.split(';');
//         let [name, nameVal] = nameValue.split('=');
//         let [exp, expVal] = expValue.split('=');
//         let date = new Date(expVal);
//         let mysqlDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
//         console.log('exp: ', mysqlDate);
//         console.log('name: ', nameVal);

//         let sql3 = `insert into cookies (user_id,cookie,date,permissions)
//             VALUES (${id},'${nameVal}','${mysqlDate}',0);`;

//         con.query(sql3, (err, result) => {
//             if (err) throw err;
//             // res.send(result);
//         })
//         let sql4 = `insert into security_questions(user_id,q1,a1,q2,a2)
//         VALUES (${id},'${q1}','${a1}','${q2}','${a2}');`
//         // console.log('sql4: ', sql4);
//         con.query(sql4, (err, result) => {
//             if (err) throw err;
//             // res.send(`posted successfully,\nyour id is ${id}`);
//         })
//         let sql5 = `INSERT INTO accounts (user_id,account_number,routing_number)
//         VALUES (${id},${id + 364179},10200023);`;
//         con.query(sql5, (err, result) => {
//             if (err) throw err;
//             // res.send(result);
//         })
//         res.json(`posted `);
//     });
// });
