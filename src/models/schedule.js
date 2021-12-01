import mongodb, { Schema } from 'mongoose'

const scheduleSchema = new Schema({
  activity_date: { type: Date, required: true, default: Date.now() },
  title: { type: String, required: true },
  description: { type: String, required: true, minlength: 1 },
  urls: [String],
  repeat: { type: String, enum: ['once', 'daily', 'weekly', 'monthly'] },
  date_at_created: { type: Date, required: true, default: Date.now() },
  date_at_updated: { type: Date, required: true, default: Date.now() },
  status: { type: Boolean, required: true, default: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

scheduleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongodb.model('Schedule', scheduleSchema)
