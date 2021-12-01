/* eslint-disable no-unused-vars */
import mongodb, { Schema } from 'mongoose'
import Task from './task'

const historySchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  duration: { type: Number, required: true },
  rest_duration: { type: Number, required: true },
  time_format: { type: String, enum: ['2:00', '12:00'] },
  category: { type: String },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  date_at_created: { type: Date, required: true, default: Date.now() },
  date_at_updated: { type: Date, required: true, default: Date.now() },
  status: { type: Boolean, required: true, default: true }
})

historySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongodb.model('HistoryPomodoro', historySchema)
