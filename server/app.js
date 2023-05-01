import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './index.route.js'
dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use('/api', router)

export default app
