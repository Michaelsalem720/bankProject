var mysql = require('mysql');
let con = require('./con')
const fs = require('fs')

function createDB() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE a", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
}
// createDB()

function createTable(jsonFile) {
  let jsonArr = []
  for (let obj of jsonFile.columns) {
    let newArr = []
    for (key in obj) {
      newArr.push(obj[key])
    }
    jsonArr.push(newArr.join(' '))
  }
  return jsonArr.join(', ')
}
function createT(jsonFile) {
  let tableName = jsonFile.table
  let sql = `CREATE TABLE ${tableName} (${createTable(jsonFile)})`
  con.query(sql, function (err, db) {
    if (err) {
      throw err
    }
    console.log("Created", db)
  })
}
function readFiles() {
  fs.readdir("./DB/jsons", function (err, files) {
    if (err) throw err
    files.forEach(file => {
      const path = `./DB/jsons/${file}`
      console.log(path)
      fs.readFile(path, "utf-8", function (err, data) {
        if (err) throw err
        createT(JSON.parse(data))
      })
    })
  })
}
// readFiles()

