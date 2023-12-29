const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4:uuidv4} = require("uuid");
const methodOverride = require("method-override")
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.listen(port, (req, res)=>{ // start a webserver and listen for incoming HTTP 
    console.log(`listening to port: ${port}`);
})

app.set("view engine", "ejs"); //setting the view engine next, you configure express to use the EJS view engine for rendering templates you use the app.set() method to set various application settings,
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id:uuidv4(),
        username:"apnacollege", 
        content: "i love coding",
    },
    {
        id:uuidv4(),
        username:"bhupesh", 
        content:"hardword",
    },
    {
        id:uuidv4(),
        username:"rahulyadav",
        content:"i got internship",
    }
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req, res)=>{
let {username, content} = req.body;
let id = uuidv4();
posts.push({id, username, content});
res.redirect("/posts");
});

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", {post});
});


app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    // res.send("patch request working"); 
    res.redirect("/posts");
})
app.get("/posts/:id/edit", (req, res)=>{
    let {id}=req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
     posts = posts.filter((p)=> id!==p.id);
    // res.send("delete success");
    res.redirect("/posts");
})

app.get("/", (req, res)=>{
    res.send("server working well")
});

