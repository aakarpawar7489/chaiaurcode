// One to many (implementation);

const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(()=>console.log("connection successful"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/RelationDemo");
}

const orderSchema = new Schema({
   item:String, 
   price:Number,
});

const customerSchema = new Schema({
    name:String,
    orders:[{
        type: Schema.Types.ObjectId,
        ref:"Order"
    },
    ],
});

// CREATING PRE AND POST MIDDLEWARE FUNCTION (before model)

// customerSchema.pre("findOneAndDelete", async()=>{
//     console.log("PRE MIDDLEWARE");
// });


customerSchema.post("findOneAndDelete", async(customer)=>{
    if(customer.orders.length){
      let res=  await Order.deleteMany({ _id:{ $in:customer.orders}});
       console.log(res)
    }
}); 



// creating model 
const Order = mongoose.model("Order", orderSchema); 
const Customer = mongoose.model("Customer", customerSchema);


// create findCustomer that's why commenting it
// const addCustomer = async()=>{
//     // let cust1 = new Customer({
//     //     name:"Rahul kumar",
//     // });
//     // let order1 = await Order.findOne({item:"Chips"});
//     // let order2 = await Order.findOne({item:"Chocolate"});

//     // cust1.orders.push(order1);
//     // cust1.orders.push(order2);
    
//     // let result = await cust1.save();
//     // console.log(result);

//     let result = await Customer.find({});
//     console.log(result)

// };

//     addCustomer();
// creating function
// const addOrders = async()=>{
//    let res= await Order.insertMany([
//         {item:"Samosa", price:233},
//         {item:"Chips", price:10},
//         {item:"Chocolate", price:40},
//    ]);
//     console.log(res);
// }

// addOrders();


// for populate  
const findCustomer=async()=>{
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
};

findCustomer();
// output
// [
//     {
//       _id: new ObjectId("653e23041de64cbc334e51d9"),
//       name: 'Rahul kumar',
//       orders: [ [Object], [Object] ],
//       __v: 0
//     }
//   ]

// if we want all information of object then use result[0] 
// output
// /
// {
//   _id: new ObjectId("653e23041de64cbc334e51d9"),
//   name: 'Rahul kumar',
//   orders: [
//     {
//       _id: new ObjectId("653e1f0f6e221eba51eaaeb5"),
//       item: 'Chips',
//       price: 10,
//       __v: 0
//     },
//     {
//       _id: new ObjectId("653e1f0f6e221eba51eaaeb6"),
//       item: 'Chocolate',
//       price: 40,
//       __v: 0
//     }
//   ],
//   __v: 0
// }


const addCust = async ()=>{
    let newCust = new Customer({
        name:"Karan Arjun"
    });
    let newOrder = new Order({
        item: "burger",
        price:250,
    });

    newCust.orders.push(newOrder);
    
    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
};
// addCust();

const delCust = async () =>{
    let data = await Customer.findByIdAndDelete("653f8cb86697eab874185ff1");
    console.log(data);
};
delCust(); 

