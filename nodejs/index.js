// project-root/node-app/index.js
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

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

// Placeholder data for missing fields
const placeholder = {
  first_name: "John",
  last_name: "Doe",
  email: "example@example.com",
  gender: "Unknown",
  address: {
    city: "Unknown City",
    state: "Unknown State",
    country: "Unknown Country",
    country_code: "XX",
  },
  card: {
    card_number: "0000000000000000",
    card_type: "Unknown",
    currency_code: "USD",
    balance: "$0.00",
  },
  married_status: false,
};

// Endpoint to retrieve all users
app.get("/users", async (req, res) => {
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const users = await collection.find().toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

/*

New endpoint to search for users based on query parameters

Usage example:
curl "http://localhost:3000/users/search?first_name=Brandise"
curl "http://localhost:3000/users/search?last_name=Southwell"
curl "http://localhost:3000/users/search?gender=Female"
curl "http://localhost:3000/users/search?email=bingerman0@youku.com"
curl "http://localhost:3000/users/search?married_status=true"
curl "http://localhost:3000/users/search?first_name=Nevil&gender=Male"

*/

app.get("/users/search", async (req, res) => {
  const query = {};
  const { first_name, last_name, gender, email, married_status } = req.query;

  if (first_name) query.first_name = first_name;
  if (last_name) query.last_name = last_name;
  if (gender) query.gender = gender;
  if (email) query.email = email;
  if (married_status) query.married_status = married_status === "true";

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const users = await collection.find(query).toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

// Endpoint to update or create a user by _id
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const existingUser = await collection.findOne({ _id: new ObjectId(id) });

    if (existingUser) {
      // Update only the provided fields
      const updatedFields = {
        ...existingUser,
        ...updateData,
        address: {
          ...existingUser.address,
          ...updateData.address,
        },
        card: {
          ...existingUser.card,
          ...updateData.card,
        },
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedFields }
      );

      return res.status(200).json({
        message: "User updated successfully",
        updatedCount: result.modifiedCount,
      });
    } else {
      // Create a new user with placeholders
      const newUserData = {
        _id: new ObjectId(id),
        ...placeholder,
        ...updateData,
        address: {
          ...placeholder.address,
          ...updateData.address,
        },
        card: {
          ...placeholder.card,
          ...updateData.card,
        },
      };

      const result = await collection.insertOne(newUserData);

      return res.status(201).json({
        message: "User created successfully",
        insertedId: result.insertedId,
      });
    }
  } catch (err) {
    console.error(`Error updating/creating user: ${err}`);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

// New endpoint to delete a user by _id
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(204).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error(`Error deleting user: ${err}`);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
