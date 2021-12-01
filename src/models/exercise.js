import mongodb, { Schema } from 'mongoose'

const exerciseSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  routine: { type: Schema.Types.ObjectId, ref: 'Routine' }
})

exerciseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongodb.model('Exercise', exerciseSchema)
