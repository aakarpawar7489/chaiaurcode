require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res)=>{
    res.send("Hellow world");
})

app.get("/twitter", (req, res)=>{
    res.send("bhupesh choudhary")
})

app.get("/login", (req, res)=>{
    res.send("<h1>welcome to login page</h1>");
})

app.listen(port, ()=>{
    console.log("listening to port 8080");
});