var express = require('express');
var router = express.Router();
let con = require('./con')
/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('you dont have access to this page');
});

router.get('/:id', (req, res, next) => {
    res.send(req.params.id);
});

router.post('/:id', (req, res, next) => {
    let userInfo = req.body
    let sql = `insert into ${user_info}(user_id, user_name, user_password`
    con.query(sql, (err, result) => {
        if (err) throw err
        res.send(result);
    })
});



module.exports = router;
