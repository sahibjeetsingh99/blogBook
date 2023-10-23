const express = require('express')
const mongoose = require('mongoose')
const commentAPICalls = require('./postmanAPICalls/commentSchemaCalls')
const postAPICalls = require('./postmanAPICalls/blogPostSchemaCalls')
const userAPICalls = require('./postmanAPICalls/userSchemaCalls')



const url = 'mongodb://127.0.0.1:27017/blogbook'

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())


mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Connected to MongoDB')

    
})

app.use('/users',userAPICalls)

app.use('/posts',postAPICalls)

app.use('/comments',commentAPICalls)

app.listen(9000, () => {
    console.log('Server started')
})