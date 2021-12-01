import mongodb, { Schema } from 'mongoose'

const routineSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true, minlength: 1 },
  date_at_created: { type: Date, required: true, default: Date.now() },
  date_at_updated: { type: Date, required: true, default: Date.now() },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  status: { type: Boolean, required: true, default: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

routineSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongodb.model('Routine', routineSchema)
