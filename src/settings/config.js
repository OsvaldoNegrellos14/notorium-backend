import mongoose from 'mongoose'

export const connect = () => {
  const connectString = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/notorium'
  mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Database connected')
  }).catch(error => {
    console.log('Error BD: ' + error)
  })
}
