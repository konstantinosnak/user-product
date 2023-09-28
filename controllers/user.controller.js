const User = require('../models/user.model');

const logger = require('../logger/logger');

exports.findAll = async(req, res) => {
    console.log("Find all users");

    try {
        const result = await User.find();
        res.status(200).json({status: true, data: result});
        console.log("Success in getting all users")
        logger.info("Log Info success in reading all users");
        logger.error("Fail in getting all users")
        // logger.log("Logger Success in reading all users");
    } catch(err) {
        res.status(400).json({status: false, data: err});
        console.log("Fail in getting all users")
        logger.error("Fail in getting all users")
    }
}

// findAll se periptosi pou exoume mongoose 6 kai prin
// pou eixe callbacks kai oxi async and await

// exports.findall = function (req, res) {
//     console.log("Find all users");

//     User.find( (err, results) => {
//         if (err) {
//             res.status(400).json({status: false, data: err});
//             console.log("Fail in getting all users")
//         } else {
//             res.status(200).json({status: true, data: results});
//             console.log("Sucess in getting all users")
//         }
//     } )
// }

exports.findOne = async(req, res) => {
    const username = req.params.username;
    console.log("Find user with username", username);
    try {
        const result = await User.findOne({username: username});
        res.status(200).json({status: true, data: result});
    } catch {
        res.status(400).json({status: false, data: err});
        console.log("Problem in getting the user");
    }
};

exports.create = async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        adress: req.body.adress,
        phone: req.body.phone,
        products: req.body.products
    });

    console.log("Insert user with username: ", req.body.username);

    try {
        const result = await newUser.save();
        res.status(200).json({status: true, data: result});
        console.log("Success inserting user with username: ", req.body.username);
    } catch(err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in inserting user with username: ", req.body.username);
    }
}

exports.update = async(req, res) => {
    const username = req.body.username;
    console.log("Update user with username: ", username);

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        adress: req.body.address,
        phone: req.body.phone
    }

    try {
        const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true});
        res.status(200).json({status: true, data: result});
        console.log("Success updating user with username: ", req.body.username);
    } catch(err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in updating user with username: ", req.body.username);
    }
};

exports.delete = async(req, res) => {
    const username = req.params.username;
    console.log("Delete user with username: ", username);

    try {
        const result = await User.findOneAndRemove({username: username});
        res.status(200).json({status: true, data: result});
        console.log("Success deleting user with username: ", username);
    } catch(err) {
        res.status(400).json({status: false, data: err});
        console.log("Problem in deleting user with username: ", username);
    }
};