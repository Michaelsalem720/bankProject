let con = require('../../DB/con')

let functions = {
    checkCount: (foreignAccount, routingNumber, checkNumber) => {
        let sql = `SELECT COUNT(*) AS count FROM transactions
        WHERE account_number = ${foreignAccount}
        AND routing_number = ${routingNumber}
        AND check_number = ${checkNumber || Math.random()}`;
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) reject(err);
                let count = result[0].count;
                resolve(count);
            });
        });
    },
    postTransaction: (credit, debit, date, foreignAccount, routingNumber, checkNumber, myAccount, token, id) => {
        console.log('hiiiiiiiiii');
        let sql = `INSERT INTO transactions (account_id, credit, debit, date, account_number, routing_number, check_number)
        SELECT accounts.id, ${credit || 0} AS credit, ${debit || 0} AS debit, '${date}' AS date, ${foreignAccount} AS account_number, ${routingNumber} AS routing_number, ${checkNumber || null} AS check_number
        FROM secure_data
        JOIN accounts ON secure_data.user_id = accounts.user_id
        WHERE secure_data.user_id = ${id}
        AND account_number = ${myAccount}
        AND secure_data.token = '${token}'`;
        return new Promise((resolve, reject) => {
            con.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }
}

module.exports = functions;