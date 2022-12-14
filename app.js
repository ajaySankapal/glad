import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connectdb.js'

import userRoute from './routes/user.js'
import staffRoute from './routes/staff.js'

const port = process.env.PORT || '8000'
const DATABASE_URL =
  'mongodb+srv://root:rootpass1234@ecommerce-site-api.yesacet.mongodb.net/glads?retryWrites=true&w=majority'

connectDB(DATABASE_URL)
export const app = express()
//  app.use(cookieParser())
app.use(express.json())
dotenv.config({ path: './config.env' })
app.use(cors())

app.use(express.urlencoded({ extended: true }))

app.use('/api', userRoute)
app.use('/api', staffRoute)

app.listen(port, () => {
  console.log(`local host:${port}`)
})
