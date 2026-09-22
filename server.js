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

// Support both dev and production URLs
const allowedOrigins = [
    process.env.FRONTEND,                    // http://localhost:5173 (dev)
    process.env.VERCEL_FRONTEND_URL,        // Vercel production frontend
    "http://localhost:3000",                 // fallback
];

var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
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
    })
    .catch((err) => {
        console.error("mongoDB connection error:", err);
    });

//only listen on a port when run directly (local dev, Render, etc.) -
//Vercel imports the exported app and invokes it per-request instead
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`node api app is running on port ${PORT}`);
    });
}

module.exports = app;
