import express from "express"
import cors from "cors"
import { MongoClient, ObjectId } from "mongodb"
import "dotenv/config"

const URI = process.env.MONGO_URI
const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(URI)
const PORT = process.env.PORT || 4040
const db = client.db("blog")
const posts = db.collection("posts")

// API ENDPOINT to 'Home' - to show all the posts
app.get("/", async (req, res) => {
  const allPosts = await posts.find().toArray()
  res.send(allPosts)
})

// API ENDPOINT to route to a single post using the id(most commonly used since its unique), the ':' makes it dynamic
app.get("/single-post/:id", async (req, res) => {
  //
  const specialId = new ObjectId(req.params.id)
  console.log(specialId)
  console.log("req.params ->", req.params)

  // get the id
  // find the item by the id
  // send back the item matching the id
  const singlePost = await posts.findOne({ _id: specialId })
  console.log(singlePost)

  res.send(singlePost)
})

// ENDPOINT to Add a single post
app.post("/", async (req, res) => {
  console.log(req.body)

  const addPost = await posts.insertOne(req.body)
  res.send(addPost)
})

//ENDPOINT to update a single post
app.patch("/", async (req, res) => {
//   const id = new ObjectId(req.body._id)

  const patchPost = await posts.findOneAndUpdate(req.query, {$set: req.body})
  res.send(patchPost)
})

//ENDPOINT to delete a single post
app.delete("/single-post/:id", async (req, res) => {
  const id = new ObjectId(req.params.id)
  console.log(req.params)
  console.log(id)
  
  const deletPost = await posts.findOneAndDelete({_id: id})
  res.send(deletPost)
})

app.listen(PORT, () => console.log("Im running on 4040"))
