const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Use Middleware:
app.use(cors());
app.use(express.json());

// MongoDB Connection:
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ph-5.b3v7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
        try {
                await client.connect();
                const itemCollections = client.db("Chaldal-Warehouse").collection("items");
                console.log("Database Connecter")

                // Root Api:
                // app.use('/', (req, res) => {
                //         res.send("Hello from Chaldal Warehouse");
                // })

                // Load All Items:
                app.get("/items", async (req, res) => {
                        const query = {};
                        const cursor = itemCollections.find(query);
                        const items = await cursor.toArray();
                        res.send(items);
                })

                //Load Item by single Id:
                app.get('/item/:id', async (req, res) => {
                        const id = req.params.id;
                        const query = { _id: ObjectId(id) };
                        const item = await itemCollections.findOne(query);
                        res.send(item);
                })

        }
        finally {

        }
}
run().catch(console.dir);


app.listen(port, () => {
        console.log("Listening from chaldal Warehouse");
})