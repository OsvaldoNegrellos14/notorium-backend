import mongodb, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  lastname: { type: String, required: true, minlength: 1 },
  username: { type: String, required: true, minlength: 1 },
  email: { type: String, required: true, match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g },
  password: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  schedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
  // TODO falta agregar los metodos de actualizacion de las notificaciones en el usuario
  pomodoro: {
    notification: {
      notifiaction_in_desktop: { type: Boolean, default: false },
      alarma: { type: Boolean, default: true },
      time_notify_before: { type: Number, required: true, default: 10 },
      volume: { type: Number, default: 50 },
      time_fade: { type: Number, default: 5 }
    },
    history_pomodoros: [{ type: Schema.Types.ObjectId, ref: 'HistoryPomodoro' }]
  },
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
