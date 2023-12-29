const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// //Middleware
// app.use((req, res, next) =>{
    //     console.log("Hi i am 1st middleware")
    //     next();
    // });
    const checkToken=(req, res, next)=>{
        let {token} = req.query;
        if(token == "giveaccess"){
            next();
        };
        // res.send("ACCESS DENIED");
        throw new ExpressError(401, "ACCESS DENIED!"); // we can handle errors in the apage by this throw error function even we can change the stack output from the error page;
    };


    app.get("/api", checkToken, (req, res)=>{
        res.send("DATA");
    });
    
    // Route
app.get("/", (req, res)=>{
    res.send("hi i am root");
    
});
// app.use((req, res, next)=>{
//     console.log("Hi, am 2nd middleware");
//     next();
// });

app.get("/random", (req, res)=>{
    res.send("this is a random page");
})

app.get("/err", (req, res)=>{
    abcd =abcd;
});

app.use((err, req, res, next)=>{
    let {status=500, message} = err;
    res.status(status).send(message);
});

// app.use((req, res, next)=>{
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.pathname, req.time);

//     next();
// });





// app.get("/api/bhupesh", checkToken, (req, res)=>{
//     res.send("HI i m bhupesh choudhary");
// });



// app.use( (err, req, res, next)=>{
//     console.log("---ERROR2 middleware---")
// next(err);
// });

// error handling middlewares
// app.use((err, req, res, next)=>{
//      console.log(err);
// });

// app.use((req,res)=>{
//     res.status(404).send("Page not found");
// })


app.listen(3000, ()=>{
    console.log("server is listening to port 3000");
});