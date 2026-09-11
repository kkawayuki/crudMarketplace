require("dotenv").config(); //for importing .env files
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute"); //import routes from seprate file
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");

//env imports
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const FRONTEND = process.env.FRONTEND;

var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); //allows anyone to access by default, use config as parameter
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //for using formURL

//routes

//now access routes via .../api/<route_name>
app.use("/api/products", productRoute);

//at home page route, given request parameter, handle response
app.get("/", (req, res) => {
    res.send("Hello NODE API"); //res = response in http
});

app.get("/blog", (req, res) => {
    res.send("Hello blog my name is kent kawashiamsi");
});

app.use(errorMiddleware); //use custom middleware

//connect mongoDB + password
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("connected to mongoDB");

        //run page on localhost 3000
        app.listen(PORT, () => {
            console.log(`node api app is running on port ${PORT}`);
        });
    })
    .catch(() => {
        console.log(console.error());
    });
