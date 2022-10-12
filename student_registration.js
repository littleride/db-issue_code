// import express from 'express';
const express = require("express");
const { v4 } = require("uuid");
const sql = require("msnodesqlv8");
var multer = require('multer');
const { response } = require("express");
const fs = require('fs');
// import {v4 as uuidv4} from 'uuid';

const upload = multer({ dest: "./images/" });

const app = express();
app.use(express.json());
const router = express.Router();


// const connectionString = "server=192.168.10.14;Database=Little_Dev;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const connectionString = "server=littlesqlserver.database.windows.net;Database=Little_2022-10-11T08-30Z;Trusted_Connection=No;Driver={SQL Server Native Client 11.0}";

let users = [];

router.post('/', upload.single("avatar"), (req, res) => {
    console.log("file", req.file);
    let user = req.body;
    // let originalname = req.file.originalname.split(".")[0];
    let fileType = req.file.mimetype.split("/")[1];
    let newFileName = `${user.studentfirstname}` + "_" + `${user.parentmobilenumber}` + "." + fileType;
    fs.rename(`./images/${req.file.filename}`, `./images/${newFileName}`, function () {
        res.send("200");
    });
    let filePath = `./images/${user.studentfirstname}` + "_" + `${user.parentmobilenumber}` + "." + fileType;
    const query = `INSERT INTO student_details(student_firstname,student_lastname,student_class,student_photo,
                 parent_firstname,parent_lastname, parent_mobilenumber,parent_emailaddress, student_address, lat, lng ) 
                 VALUES('${user.studentfirstname}', '${user.studentlastname}', ${user.studentclass}, '${filePath}',
                 '${user.parentfirstname}', '${user.parentlastname}', ${user.parentmobilenumber}, '${user.parentemailaddress}',
                 '${user.address}', ${user.lat}, ${user.lng} );`;
    sql.query(connectionString, query, (err, rows) => {
        console.log("rows",rows);
        console.log("err", err);
    });
});

router.get('/', (req, res) => {
    // const query = `select * from student_details`;
    const query = ``;
    sql.query(connectionString, query, (err, rows) => {
        console.log("rows",rows);
        console.log("error",err);
    });
    console.log(req.body);
    users.push(req.body);
    res.send(users);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === id);

    res.send(foundUser);
})

// router.post('/', (req, res) => {
//     const user = req.body;
//     const query = `INSERT INTO student_details(student_firstname,student_lastname,student_class,student_photo,
//         parent_firstname,parent_lastname, parent_mobilenumber,parent_emailaddress, student_address, lat, lng ) 
//         VALUES('${user.studentfirstname}', '${user.studentlastname}', ${user.studentclass}, '${user.studentPhoto}',
//         '${user.parentfirstname}', '${user.parentlastname}', ${user.parentmobilenumber}, '${user.parentemailaddress}',
//         '${user.address}', ${user.lat}, ${user.lng} );`;
//     sql.query(connectionString, query, (err, rows) => {
//         // console.log("rows",rows);
//     });
//     // console.log(user);
//     users.push({ ...user, id: v4() });

//     res.send(`User with the student name ${user.studentfirstname} is inserted successfully`);
// })  


module.exports = router;
