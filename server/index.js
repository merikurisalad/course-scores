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

const PORT = 4000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});