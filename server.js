const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/productModel"); //import model schema

app.use(express.json());
app.use(express.urlencoded({extended: false})) //for using formURL 

//routes

//at home page route, given request parameter, handle response
app.get("/", (req, res) => {
    res.send("Hello NODE API"); //res = response in http
});

app.get("/blog", (req, res) => {
    res.send("Hello blog my name is kent kawashiamsi");
});

//retreive ALL data from mongoDB
//res status tells user in frontend what happened, 200 OK, 500 ERROR
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({}); //await data from database
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message }); //500 error + message
    }
});

//get specific product
app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message }); //500 error + message
    }
});

//when saving data to DB use post
//async + await because interacting with DB
app.post("/product", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//UPDATE A PRODUCT: use put/patch method
app.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params; //construct id from request parameters
        const product = await Product.findByIdAndUpdate(id, req.body);

        //if product cannot be found
        if (!product) {
            return res
                .status(404)
                .json({ message: `cannot find product with ID ${id}` });
        }
        
        const updatedProduct = await Product.findById(id);  //retreive updatedProduct data
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete product
app.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const product = await Product.findByIdAndDelete(id, req.body); //use deconstructed id to find+delete

        //if product cannot be found
        if (!product) {
            return res
                .status(404)
                .json({ message: `cannot find product with ID ${id}` });    //need to be using `` for nested expression
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//connect mongoDB + password
mongoose
    .connect(
        "mongodb+srv://<removed>:<removed>@<removed>/?appName=<removed>",
    )
    .then(() => {
        console.log("connected to mongoDB");

        //run page on localhost 3000
        app.listen(3000, () => {
            console.log("node api app is running on port 3000");
        });
    })
    .catch(() => {
        console.log(console.error());
    });
