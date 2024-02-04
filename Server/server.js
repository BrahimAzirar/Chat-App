const ex = require('express');
const { MongoClient } = require('mongodb');
const { auth } = require('./Routes/AuthRoutes');
const cors = require("cors");
require('dotenv').config();

const app = ex();
const client = new MongoClient(process.env.MONGO_URL);

app.use(ex.json());
app.use(cors({ origin: "*" }));
app.use('/authMember', auth);

async function main() {
    try {
        await client.connect();
        const db = client.db("ChatDB");
        console.log('Connected successfully to mongodb :)');
        return db.collection('Members');
    } catch (error) {
        console.log(`Error in connection on mongoDB: ${error.message}`);
        throw error;
    }
}

(async () => {
    try {
        module.exports = await main();
        app.listen(3500, console.log("Starting the server (http://localhost:3500)"));
    } catch (error) {
        console.error(`Failed to start the server: ${error.message}`);
    }
})();