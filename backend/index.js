const { MongoClient, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

app.get('/tasks', async (req, res) => {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db("taskmaster");
  const collection = db.collection('tasks');

  res.send(await collection.find({}).toArray())
  await client.close()
})

app.post("/tasks", async (req, res) => {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db("taskmaster");
  const collection = db.collection('tasks');

  const { task, completed } = req.body

  const Line = await collection.insertOne({
    task: task,
    completed: completed
  })

  res.send(Line)

  await client.close()
})

app.delete("/tasks", async (req, res) => {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db("taskmaster");
  const collection = db.collection('tasks');

  const { id } = req.body

  await collection.deleteOne({ _id: id })

  res.send({ status: 200 })

  await client.close()
})

app.put("/tasks", async (req, res) => {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db("taskmaster");
  const collection = db.collection('tasks');

  const { id, completed } = req.body

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: { completed: completed } })

  res.send({ status: 200 })

  await client.close()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})