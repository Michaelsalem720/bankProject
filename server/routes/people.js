const { table } = require('console');
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
router.get('/accounts/:id', (req, res, next) => {
    let sql = `SELECT account_number AS account
    FROM accounts 
    JOIN people 
    ON accounts.user_id = people.id 
    WHERE deleted = 0
    AND ${req.params.id} = people.id`
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});
router.get('/sq', (req, res, next) => {
    let sql = "SELECT * FROM security_questions"
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});

router.get('/sq', (req, res, next) => {
    let sql = "SELECT * FROM security_questions"
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});
router.get('/passwords', (req, res, next) => {
    let sql = "SELECT * FROM passwords"
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});

router.get('/cookies', (req, res, next) => {
    let sql = "SELECT * FROM cookies"
    console.log(req.cookies);
    con.query(sql, function (err, result) {
        if (err) {
            throw err
        }
        res.json(result)
    })
});
// router.post('/cookies', (req, res, next) => {

// })
router.post('/', (req, res, next) => {
    let { firstName, lastName, username, password, password2, email, phone, q1, a1, q2, a2, dob } = req.body.userInfo;
    let sql1 = `insert into people (first_name,last_name,username,email,phone,dob,deleted)
    VALUES ('${firstName}','${lastName}','${username}','${email}',${phone},'${dob}',0)`;
    // console.log('sql1: ', sql1);
    con.query(sql1, (err, result) => {
        if (err) throw err;
        let id = result.insertId;
        let sql2 = `insert into passwords (user_id,password)
         VALUES (${id},'${password}')`;
        // console.log('sql2: ', sql2);
        con.query(sql2, (err, result) => {
            if (err) throw err;
            // res.send(result);
        });
        let cookieStr = req.body.Cookie;
        let [nameValue, expValue, path] = cookieStr.split(';');
        let [name, nameVal] = nameValue.split('=');
        let [exp, expVal] = expValue.split('=');
        let date = new Date(expVal);
        let mysqlDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        console.log('exp: ', mysqlDate);
        console.log('name: ', nameVal);

        let sql3 = `insert into cookies (user_id,cookie,date,permissions)
            VALUES (${id},'${nameVal}','${mysqlDate}',0);`;

        con.query(sql3, (err, result) => {
            if (err) throw err;
            // res.send(result);
        })
        let sql4 = `insert into security_questions(user_id,q1,a1,q2,a2)
        VALUES (${id},'${q1}','${a1}','${q2}','${a2}');`
        // console.log('sql4: ', sql4);
        con.query(sql4, (err, result) => {
            if (err) throw err;
            // res.send(`posted successfully,\nyour id is ${id}`);
        })
        let sql5 = `INSERT INTO accounts (user_id,account_number,routing_number)
        VALUES (${id},${id + 364179},10200023);`;
        con.query(sql5, (err, result) => {
            if (err) throw err;
            // res.send(result);
        })
        res.json(`posted `);
    });
});


router.put('/:id', (req, res, next) => {
    console.log('req.bodyyyyyyyyyyyyyyyyyyyyyyyy :',req.body);
    let sql = ''
    let id = req.params.id
    let { description, info } = req.body
    if (description === 'password') {
        sql = `UPDATE passwords set ${description} = '${info}'
        where user_id = ${id} `
    }
    else {
        let str = description === 'phone' ? "" : "'"
        sql = `update people set ${description}=${str}${info}${str}
     where id = ${id} `
    }
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) throw err
        res.json(result);
    })
});
///temporary
router.delete('/delete', (req, res, next) => {
    delete1()
    delete2()
    delete3()
    delete4()
    function delete1() {
        let sql = `DELETE FROM passwords`
        con.query(sql, (err, result) => {
            if (err) throw err
            // res.send(result);
        })
    }
    function delete2() {
        let sql = `DELETE FROM cookies`
        con.query(sql, (err, result) => {
            if (err) throw err
            // res.send(result);
        })
    }
    function delete3() {
        let sql = `DELETE FROM security_questions`
        con.query(sql, (err, result) => {
            if (err) throw err
            // res.send(result);
        })
    }
    function delete4() {
        let sql = `DELETE FROM people`
        con.query(sql, (err, result) => {
            if (err) throw err
            // res.send(result);
        })
    }
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
