import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server in port: ' + PORT)
})
