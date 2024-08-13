const mysql = require("mysql2")
var mysqlconnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"darshan6",
    database:"courses"
})

mysqlconnection.connect((err)=>{
    if(!err){
        console.log("database connected")
    }else{
        console.log(err)
    }
})

module.exports = mysqlconnection;