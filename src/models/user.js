import mongodb, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  lastname: { type: String, required: true, minlength: 1 },
  username: { type: String, required: true, minlength: 1 },
  email: { type: String, required: true, match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g },
  password: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  schedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
  pomodoro: { type: Schema.Types.ObjectId, ref: 'Pomodoro' },
  routines: [{ type: Schema.Types.ObjectId, ref: 'Routine' }],
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  reminders: [{ type: Schema.Types.ObjectId, ref: 'Reminder' }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

module.exports = mongodb.model('User', userSchema)
