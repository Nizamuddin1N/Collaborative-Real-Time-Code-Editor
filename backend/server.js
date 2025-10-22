import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import documentRouter from './routes/documentRoutes.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(cors());
app.use('/document', documentRouter)
app.use('/', (req, res) => {
    res.json("Route running")
})
app.listen(5000, () => console.log("Server running on port 5000"))