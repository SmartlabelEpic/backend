import express from 'express'
import app from './app.js'
import connectToDatabase from "./config/database.js";
import dotenv from 'dotenv'

dotenv.config({path:"./config/.env"});

const PORT = process.env.PORT || 3001;

connectToDatabase();


app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
})