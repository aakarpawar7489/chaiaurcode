const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(()=>console.log("connection successful")).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/RelationDemo")
}

const userSchema = new Schema({
    username:String,
    email:String,
});

const postSchema = new Schema({
    content:String, 
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async()=>{
    let user1 =  new User({
        username:"rahulkumar", 
        email:"rahul@gmail.com"
    });

    // finding user1 to show 
    let user = await User.findOne({username:"rahulkumar"});

    // post 1
    let post1 = new Post({
        content:"Hello world!",
        likes:7
    });

    // post1.user = user1;
     // await user1.save();
    // await post1.save();

    // post 2
    let post2 = new Post({
        content:"Bye Bye",
        likes: 34
    });
    // for post 2
    post2.user = user;
       await post2.save();
   


 
}
// addData();


// can delete like this........... deleting data

// const del = async ()=>{
//     await Post.findByIdAndDelete("")
//     await Post.findByIdAndDelete("")
// }
// del();


// can find the data using populate 

const getData = async()=>{
    let result = await Post.findOne({}).populate("user", "username");
    console.log(result);
};
getData();