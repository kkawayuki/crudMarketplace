//anything that interacts with DB need mongoose
const mongoose = require("mongoose");
const { timeStamp } = require("node:console");

//creating schema (object) for database
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter a product name"],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

//save to product object to export
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
