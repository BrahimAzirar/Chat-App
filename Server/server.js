const ex = require('express');
const { MongoClient } = require('mongodb');
const { auth } = require('./Routes/AuthRoutes');
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();

const app = ex();
let db;

app.use(ex.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use('/authMember', auth);

MongoClient.connect(process.env.MONGO_URL)
    .then(client => {
        db = client.db('ChatDB');
        app.locals.db = db;

        console.log("Connected with mongodb :)");
        app.listen(3500, console.log("Starting the server (http://localhost:3500)"));
    })
    .catch(err => console.log(`the error from server.js: ${err.message}`));