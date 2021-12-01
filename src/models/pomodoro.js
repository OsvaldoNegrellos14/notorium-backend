import mongodb, { Schema } from 'mongoose'
// import Notification from './notification'
// import HistoryPomodoro from './hitstory_pomodoro'

const pomodoroSchema = new Schema({
  notification: { type: Schema.Types.ObjectId, ref: 'Notification' },
  history_pomodoros: [{ type: Schema.Types.ObjectId, ref: 'HistoryPomodoro' }]
})

pomodoroSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongodb.model('Pomodoro', pomodoroSchema)
