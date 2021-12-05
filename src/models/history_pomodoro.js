/* eslint-disable no-unused-vars */
import mongodb, { Schema } from 'mongoose'

const historySchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  rest_duration: { type: Number, required: false },
  time_format: { type: String },
  category: { type: String },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  date_at_created: { type: Date, required: true, default: Date.now() },
  date_at_updated: { type: Date, required: true, default: Date.now() },
  status: { type: Boolean, required: true, default: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

historySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongodb.model('HistoryPomodoro', historySchema)
