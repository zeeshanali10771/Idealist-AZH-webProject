
/* eslint-disable no-console */
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')

process.on('uncaughtException', err => {
console.error(err.name + ' ' + err.message)
process.exit(1)
})

dotenv.config({
path: './config.env'
})
const app = require('./app')

const DB = process.env.DATABASE.replace(
'<password>',
process.env.DATABASE_PASSWORD
)
mongoose.set('strictQuery', true)
mongoose
.connect(DB, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('Database connection successfull!✨✨'))

let port = process.env.PORT || 30001
const server = app.listen(process.env.PORT, () => {
console.log('Starting the server at 127.0.0.1:' + process.env.PORT)
})

process.on('unhandledRejection', err => {
console.error(err.name + ' ' + err.message)

server.close(() => {
process.exit(1)
})
})
