const mongoose = require("mongoose"); // require  mongoose
const Chat = require("./models/chat.js"); // chat model

// connection setup
main().
then(()=>{ console.log("connection successful");})
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakeWhatsapp");

    

// mongoose.connection.close();
}

let allChats = [{
    from : "neha",
    to : "priya", 
    msg : " hi priya how are you",
    created_at :new Date(),
},
{
    from : "tarun",
    to : "shubham", 
    msg : " hi shubham how are you",
    created_at :  new Date(),
},
{
    from : "ram",
    to : "shyam", 
    msg : " hi shyam how are you",
    created_at :new Date(),
},
{
    from : "anurag",
    to : "harsh", 
    msg : " hi harsh how are you",
    created_at :new Date(),
},
{
    from : "harsh",
    to : "akku", 
    msg : " hi akku how are you",
    created_at : new Date(),
},
{
    from : "anil",
    to : "avinash", 
    msg : " hi avinash how are you",
    created_at :new Date(),
},
{
    from : "vivek",
    to : "gupchup", 
    msg : " hi gupchup how are you",
    created_at :new Date(),
}];


Chat.insertMany(allChats);