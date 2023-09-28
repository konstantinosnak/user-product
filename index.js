const express = require('express');

const mongoose = require('mongoose');
const app = express();
const port = 3000;

const cors = require('cors');
const user = require('./routes/user.route');
const product = require('./routes/product.route');
const user_products = require('./routes/user-product.route');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => { console.log("Connection with database established")},
        err => { console.log("Failed to establish connection", err)}
    );

app.use(cors({
    origin: '*'
    // origin: [ 'https://www.example.com', 'http://localhost:8000']
}))

app.use('/', express.static('files'));

app.use('/api/users', user);
app.use('/api/products', product);
app.use('/api/user-products', user_products);

app.use('/api-docs',
swaggerUI.serve,
swaggerUI.setup(swaggerDocument.options)
);

app.listen(port, () => {
    console.log("Listening on port 3000");
})