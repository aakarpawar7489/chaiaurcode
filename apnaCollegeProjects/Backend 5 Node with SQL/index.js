const express = require("express");
const {faker} = require("@faker-js/faker");
const mysql = require("mysql2");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({ 
    host:"localhost",
    user:"root",
    database:"delta_app",
    password:"Aeroplane@2000"
  });

//   let getRandomUser=()=> {
//     return [
//      faker.string.uuid(),
//       faker.internet.userName(),
//       faker.internet.email(),
//      faker.internet.password(),
//     ];
//   };


//   let q = "insert into user(id, username, email, password) values ?";
//   let data = [];
//   for(let i=1;i<=5;i++){
//     data.push(getRandomUser());
//   }
  
//   try{

//     connection.query(q, [data], (err, result)=>{
//         if(err)throw err;
//         console.log(result);       
//     });
// }catch(err){
//     console.log(err);
// }

// connection.end(); // to close/end the connection 

//Home route
app.get("/", (req, res)=>{
    let q = "SELECT count(*) FROM user";
    try{
        connection.query(q, (err, result)=>{
            if(err)throw err;
            let count = result[0]["count(*)"];       
            res.render("home.ejs", {count});
        });
    }catch(err){
        console.log(err);
        res.send("some error occured");
    }
    
})

//show Route
app.get("/user", (req, res)=>{
    let q = "SELECT * FROM user";
    try{
        connection.query(q, (err, users)=>{
            if(err)throw err;
                 
            res.render("showusers.ejs", {users});
        });
    }catch(err){
        console.log(err);
        res.send("some error occured");
    }
});
//edit Route
app.get("/users/:id/edit", (req, res)=>{
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs", {user});
        });
    }catch(err){
        console.log(err);
        res.send("some error occured");
    }
});
// update user
app.patch("/user/:id", (req, res)=>{
    let {id} = req.params;
    let {password: formPass, username: newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
        connection.query(q, (err, result)=>{
            if(err) throw err;
            let user = result[0];
            const alertData=  'This is an information alert';
              
            if(formPass != user.password){
                res.send(alertData);
            } else{
                let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
                connection.query(q2, (err, result)=>{
                    if(err) throw err;
                    res.redirect("/user");
                })
        
            }
        });
    }catch(err){
        console.log(err);
        res.send("some error occured");
    }
});
app.listen("8082", ()=>{
    console.log("listeing to port:8082");
})

