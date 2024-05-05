// project-root/node-app/index.js
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// Connection URI and client
const uri = "mongodb://mongodb:27017";
const client = new MongoClient(uri);

// Database and collection names
const dbName = "mydatabase";
const collectionName = "usersCollection";

// Middleware to handle JSON responses
app.use(express.json());

// Endpoint to retrieve all users
app.get("/users", async (req, res) => {
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const users = await collection.find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
