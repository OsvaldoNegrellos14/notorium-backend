import mongodb, { Schema } from 'mongoose'

const notificationSchema = new Schema({
  notifiaction_in_desktop: { type: Boolean, default: false },
  alarma: { type: Boolean, default: true },
  time_notify_before: { type: Number, required: true },
  volume: { type: Number, default: 50 },
  time_fade: { type: Number },
  date_at_created: { type: Date, required: true, default: Date.now() }
})

notificationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongodb.model('Notification', notificationSchema)
