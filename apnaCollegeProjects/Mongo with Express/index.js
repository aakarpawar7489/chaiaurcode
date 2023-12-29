const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakeWhatsapp");
    console.log("Connection successful");

    // Move the creation and saving of chat1 here
    let chat1 = new Chat({
      from: "neha",
      to: "priya",
      msg: "send me your exam sheets",
      created_at: new Date(),
    });

    chat1.save().then((res) => {
      // console.log(res);
    });
  } catch (err) {
    console.error(err);
  }
}
  // INdex route
  app.get("/chats", async (req, res, next)=>{
   try{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
   }catch(err){
    next(err);
   }
  });

  
  // new route
  app.get("/chats/new", (req, res)=>{
    // throw new ExpressError(404, "Page not found");
    res.render("new.ejs");
  });

  app.post("/chats/new", async (req, res, next) =>{
    try{
      let {from, to, msg} = req.body;
      let newChat = new Chat({
        from: from,
        to: to, 
        msg: msg, 
        created_at: new Date()
      });
      await newChat.save();
      res.redirect("/chats");
    } catch(err){
      next(err);
    }
  });

  // newChat
  // .save()
  // .then((res)=>{console.log("chat saved");})
  // .catch((err)=>{
  //   console.log(err)
  // });
  //   // res.send("working");
  //   res.redirect("/chats");
  // });

  function asyncWrap(fn){
    return function(req, res, next) {
      fn(req, res, next).catch((err)=>next(err));
    }
  }


 //New Show Route
 app.get("/chats/:id",  asyncWrap(async(req, res, next)=>{

    let {id}=req.params;
  let chat = await Chat.findById(id);
  if(!chat){
   return next(new ExpressError(404, "chat not found"));
  };
  res.render("edit.ejs", {chat});
  }));
  

  //EDIT ROUTE
  app.get("/chats/:id/edit", asyncWrap(async (req, res)=>{
  
    let {id} = req.params;
    let chat = await Chat.findById(id);
    console.log(chat);
    res.render("edit.ejs", {chat})
  }));

    

  //UPDATE ROUTE
  app.put("/chats/:id", asyncWrap(async (req, res, next)=>{

      let {id} = req.params;
      let {msg: newMsg} = req.body;
      const chat = await Chat.findByIdAndUpdate(
        id, {msg: newMsg},
        {runValidators:true, new:true}
      );
        
        res.redirect("/chats");
    } ));
    // let updatedChat = await Chat.findByIdAndUpdate(
    //   id, {msg: newMsg},
    //   {runValidators:true, new:true}
    // );
   
  

  //delete chat 
  app.delete("/chats/:id", asyncWrap(async (req, res, next)=>{
  
      let {id} = req.params;
      let chat = await Chat.findByIdAndDelete(id);
      console.log( `deleted: ${chat}`);
      res.redirect("/chats");    
  }));

main().then(() => {
  app.get("/", (req, res) => {
    res.send("root is working");
  });

  const handleValidationErr = (err)=>{
    console.log("This was a ValidationError! please follow rules")
    console.dir(err.message);
    return err;
  }

    app.use((err, req, res, next)=>{
      console.log(err.name);
      if(err.name=="ValidationError"){
        err= handleValidationErr(err);
      }
      next(err);
    })

  // Error handling middleware 
app.use((err, req, res, next)=>{
  let {status=500, message="Some error Occured"}=err;
  res.status(status).send(message);
});

  app.listen(8080, () => {
    console.log("Server is listening on port 8080");
  });
});