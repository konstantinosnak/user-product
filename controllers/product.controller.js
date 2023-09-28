const Product = require('../models/product.model');

exports.findAll = async(req, res) => {
    console.log("Find all products");

    try {
        const results = await Product.find();
        res.status(200).json({status: true, data: results});
        console.log("Success in getting all products")
    } catch(err) {
        res.status(400).json({status: false, data: err});
        console.log("Fail in getting all products")
    }
};

exports.findOne = async(req, res) => {
    const name = req.params.product;
    console.log("Find product with name", name);
    try {
        const result = await Product.findOne({ product: name});
        res.status(200).json({status: true, data: result});
    } catch {
        res.status(400).json({status: false, data: err});
        console.log("Problem in getting the user");
    }
};

exports.create = async(req, res) => {
    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    });

    console.log("Insert product: ", req.body.product);

    try {
        const result = await newProduct.save();
        res.status(200).json({status: true, data: result});
        console.log("Success inserting product: ", req.body.product);
    } catch(err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in inserting product: ", req.body.product);
    }
};

exports.update = async(req, res) => {
    const product = req.body.product;
    console.log("Update product: ", product);

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    }

    try {
        const result = await Product.findOneAndUpdate({ product: product}, updateProduct, { new: true });
        res.status(200).json({status: true, data: result});
        console.log("Success updating product: ", req.body.product);
    } catch (err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in updating product: ", req.body.product);
    }
};


exports.delete = async(req, res) => {
    const product = req.params.product;
    console.log("Delete product: ", product);

    try {
        const result = await Product.findOneAndRemove({ product: product });
        res.status(200).json({status: true, data: result});
        console.log("Success deleting product: ", product);
    } catch (err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in deleting product: ", product);
    }
};