const express = require('express');
const myrouter = express.Router();
const connection = require("../database/dbconnect");

myrouter.get("/login", (req, res) => {res.render("Login");})

myrouter.post("/login", (req, res) => {
    connection.query("SELECT * FROM cms", (err, data, fields) => {
        if(err){
            res.status(404).send("data not found");
        }
        else{
            //res.json(data);
            res.status(200).render("DisplayCourse", {coursedata : data})
        }
    })
})

// get all courses details
myrouter.get("/courses", function(req, resp){
    connection.query("select * from cms", function(err, data, fields){
        if(err){
            resp.status(500).send("Data not found!!");
        }else{
            // display all the courses details
            //resp.json(data);
            resp.status(200).render("DisplayCourse", {coursedata : data})
        }
    })
})

// myrouter.get("/add", (req,res) => {
//     res.render("AddCourse");
// })

// myrouter.post("/insert", (req,res) => {
//     connection.query("insert into cms values(default,?,?,?)",[req.body.cname, req.body.fees, req.body.duration],
//         (err,data) => 
//         //    {if(err){
//          //   res.status(500).send("insertion failed !!!");
//       //  }
//       //  else{
//             res.status(200).send("added successfully")
// )})

myrouter.get("/add",(req,res)=>{
    res.render("AddCourse");
    })
    
    myrouter.post("/insert",(req,res)=>{
        connection.query("insert into cms values(default,?,?,?)",[req.body.cname,req.body.fees,req.body.duration],
            (err,data,fields)=>{if(err){
                res.status(500).send("insertion failed")
            }
        else{
             res.status(200).send("Data added successfully")
    
        }})
    })

myrouter.get("/updateCourse",(req,res) =>{
    res.render("UpdateCourse");
})

myrouter.post("/update",(req,res) => {
    connection.query("update cms set cname=?, fees=?, duration=? where id=?",[req.body.cname,req.body.fees,req.body.duration,req.body.id],
            (err,data,fields) => {
            if(err){
                res.status(500).send("updation failed!!")
            }
            else{
                res.status(200).send("updation success!!")
            }
        }
    )
})

myrouter.get("/deleteCourse",function(req,res){
    res.render("DeleteCourse");
})

myrouter.post("/delete",function(req,res){
    connection.query("delete from cms where id=?",[req.body.id],function(err,data){
        if(err){
            res.status(500).send("deletion failed!")
        }else{
            res.status(200).send("deletion success!")
        }
    })
})

module.exports = myrouter;