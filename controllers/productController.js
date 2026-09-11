const Product = require('../models/productModel')

//javascript way of making functions

//get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); //await data from database
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message }); //500 error + message
    }
}

//get single product
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message }); //500 error + message
    }
}

//create a product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

//update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; //construct id from request parameters
        const product = await Product.findByIdAndUpdate(id, req.body);

        //if product cannot be found
        if (!product) {
            return res
                .status(404)
                .json({ message: `cannot find product with ID ${id}` });
        }

        const updatedProduct = await Product.findById(id); //retreive updatedProduct data
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id, req.body); //use deconstructed id to find+delete

        //if product cannot be found
        if (!product) {
            return res
                .status(404)
                .json({ message: `cannot find product with ID ${id}` }); //need to be using `` for nested expression
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//controller exports
module.exports  = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}