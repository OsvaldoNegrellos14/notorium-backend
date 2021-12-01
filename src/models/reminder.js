import mongodb, { Schema } from 'mongoose'

const reminderSchema = new Schema({
  title: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true, minlength: 1 },
  remember_date: { type: Date, required: true },
  date_at_created: { type: Date, required: true, default: Date.now() },
  date_at_updated: { type: Date, required: true, default: Date.now() },
  status: { type: Boolean, required: true, default: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

reminderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongodb.model('Reminder', reminderSchema)
