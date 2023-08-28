import express from 'express'
import cors from 'cors'

import { MongoClient, ObjectId } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient('mongodb+srv://erickv363:erickv123@cluster0.hr1r2zw.mongodb.net/')
const db = client.db('blog')
const posts = db.collection('posts')

app.get('/', async (req, res) => {
    const allPosts = await posts.find().toArray()
    res.send(allPosts)
})

app.post('/', async (req, res) => {
    console.log(req.body)

    const addPost = await posts.insertOne(req.body)
    res.send(addPost)
})

app.patch('/', (req, res) => {
    console.log('Im patching')
    res.send('Im patching')
})

app.delete('/', (req, res) => {
    console.log('Im deleting')
    res.send('Im deleting')
})

app.listen(4000, () => console.log('Im running on 4000'))