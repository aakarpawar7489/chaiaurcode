const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js"); // Assuming you have a Chat model
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js"); // Assuming you have ExpressError.js

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB connection
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakeWhatsapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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

// Index route
app.get("/chats", async (req, res, next) => {
  try {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
  } catch (err) {
    next(err);
  }
});

// New route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create route
app.post("/chats/new", async (req, res, next) => {
  try {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    });
    await newChat.save();
    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

// Show route
app.get("/chats/:id", async (req, res, next) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  if (!chat) {
    return next(new ExpressError(404, "Chat not found"));
  }
  res.render("show.ejs", { chat });
});

// Edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update route
app.put("/chats/:id", async (req, res, next) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  const chat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );

  res.redirect("/chats");
});

// Delete route
app.delete("/chats/:id", async (req, res, next) => {
  let { id } = req.params;
  let chat = await Chat.findByIdAndDelete(id);
  console.log(`Deleted: ${chat}`);
  res.redirect("/chats");
});

main().then(() => {
  // Root route
  app.get("/", (req, res) => {
    res.redirect("/chats");
  });

  // Handle validation errors
  const handleValidationErr = (err) => {
    console.log("This was a ValidationError! Please follow the rules");
    console.dir(err.message);
    return err;
  };

  app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name == "ValidationError") {
      err = handleValidationErr(err);
    }
    next(err);
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    let { status = 500, message = "Some error occurred" } = err;
    res.status(status).send(message);
  });

  // Start the server
  app.listen(8081, () => {
    console.log("Server is listening on port 8081");
  });
});
