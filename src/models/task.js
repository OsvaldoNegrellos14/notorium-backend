import mongodb, { Schema } from 'mongoose'

const taskSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true },
  time_aprox: { type: Number, required: true },
  date_at_created: { type: Date, required: true, default: Date.now() },
  date_at_updated: { type: Date, required: true, default: Date.now() },
  status: { type: Boolean, required: true, default: true }
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongodb.model('Task', taskSchema)
