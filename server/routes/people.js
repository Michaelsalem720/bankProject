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

router.get('/sq', (req, res, next) => {
    let sql = "SELECT * FROM security_questions"
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
    let data = req.body;
    let sql1 = `insert into people (first_name,last_name,username,email,phone,dob,deleted)
    VALUES ('${data.first_name}','${data.last_name}','${data.username}','${data.email}',${data.phone},'${data.dob}',0)`;
    con.query(sql1, (err, result) => {
        if (err) throw err;
        let id = result.insertId;
        let sql2 = `insert into passwords (user_id,password)
         VALUES (${id},'${data.password}')`;
        con.query(sql2, (err, result) => {
            if (err) throw err;
            // res.send(result);
        });
        //     let sql3 = `insert into cookies (user_id,cookie,date,permissions)
        //      VALUES (${id},'${req.cookies}','${req.cookies}'`
        //     con.query(sql3, (err, result) => {
        //         if (err) throw err;
        //         res.send(result);
        // })
        let sql4 = `insert into security_questions(user_id,q1,a1,q2,a2)
        VALUES (${id},'${data.q1}','${data.a1}','${data.q2}','${data.a2}');`
        con.query(sql4, (err, result) => {
            if (err) throw err;
            res.send(result);
    });
    })
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
        res.send(result);
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
