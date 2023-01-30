const { table } = require('console');
var express = require('express');
var router = express.Router();
let mysql = require('mysql')
let con = require('../DB/con')



// router.get('/cookies', (req, res) => {
//     console.log(req.cookies);
//     res.send('Cookies received');
// });

router.get('/', (req, res, next) => {
    let sql = "SELECT * FROM people WHERE deleted = 0"
    con.query(sql, function (err, db) {
        if (err) {
            throw err
        }
        res.send(db)
    })
});

router.get('/passwords', (req, res, next) => {
    let sql = "SELECT * FROM passwords"
    con.query(sql, function (err, db) {
        if (err) {
            throw err
        }
        res.send(db)
    })
});

router.get('/sq', (req, res, next) => {
    let sql = "SELECT * FROM security_questions"
    con.query(sql, function (err, db) {
        if (err) {
            throw err
        }
        res.send(db)
    })
});
router.get('/passwords', (req, res, next) => {
    let sql = "SELECT * FROM passwords"
    con.query(sql, function (err, db) {
        if (err) {
            throw err
        }
        res.send(db)
    })
});

router.get('/cookies', (req, res, next) => {
    let sql = "SELECT * FROM cookies"
    con.query(sql, function (err, db) {
        if (err) {
            throw err
        }
        res.send(db)
    })
});



router.post('/', (req, res, next) => {
    let { firstName, lastName, username, password, password2, email, phone, q1, a1, q2, a2, dob } = req.body;
    let sql1 = `insert into people (first_name,last_name,username,email,phone,dob,deleted)
    VALUES ('${firstName}','${lastName}','${username}','${email}',${phone},'${dob}',0)`;
    console.log('sql1: ', sql1);
    con.query(sql1, (err, result) => {
        if (err) throw err;
        let id = result.insertId;
        let sql2 = `insert into passwords (user_id,password)
         VALUES (${id},'${password}')`;
        console.log('sql2: ', sql2);
        con.query(sql2, (err, result) => {
            if (err) throw err;
            // res.send(result);
        });
        //     let sql3 = `insert into cookies (user_id,cookie,date,permissions)
        //      VALUES (${id},'${req.cookies}','${req.cookies}'`
        //     con.query(sql3, (err, result) => {
        //         if (err) throw err;
        //         // res.send(result);
        // })
        let sql4 = `insert into security_questions(user_id,q1,a1,q2,a2)
        VALUES (${id},'${q1}','${a1}','${q2}','${a2}');`
        console.log('sql4: ', sql4);
        con.query(sql4, (err, result) => {
            if (err) throw err;
            // res.send(`posted successfully,\nyour id is ${id}`);
        })
        res.json(`posted `);
    });
});


router.put('/:id', (req, res, next) => {
    let sql = ''
    let id = req.params.id
    let { title, data } = req.body
    if (title === 'password') {
        sql = `update passwords set ${title} = '${data}'
        where user_id = ${id} `
    }
    else {
        let str = title === 'phone' ? "" : "'"
        sql = `update people set ${title}=${str}${data}${str}
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
