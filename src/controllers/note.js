/* eslint-disable eqeqeq */
import Note from '../models/note'
import User from '../models/user'

export const createNote = async (req, res, next) => {
  const { title, description, userId } = req.body
  const user = await User.findById(userId)
  const newNote = new Note({
    title,
    description,
    user: user._id
  })
  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    res.status(200).json({ status: true, info: savedNote })
  } catch (error) {
    next(error)
  }
}

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params
    const note = await Note.findById(noteId)
    res.status(200).json({ status: true, info: note })
  } catch (error) {
    next(error)
  }
}

export const getAllNote = async (req, res, next) => {
  try {
    const { userId } = req.params
    const notes = await Note.find({ user: userId })
    res.status(200).json({ status: true, info: notes })
  } catch (error) {
    next(error)
  }
}

export const updateNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params
    const { title, description } = req.body
    const noteUpdate = {
      title,
      description,
      date_at_updated: Date.now()
    }
    const note = await Note.findByIdAndUpdate(noteId, noteUpdate, { new: true })
    res.status(200).json({ success: true, info: note })
  } catch (error) {
    next(error)
  }
}

export const deleteNoteById = async (req, res, next) => {
  try {
    const { noteId, userId } = req.params
    const user = await User.findById(userId)
    // res.json(user)
    const notes = await user.notes.filter((note) => note != noteId)
    await Note.findByIdAndRemove(noteId)
    user.notes = notes
    await user.save()
    res.status(200).json({ status: true, info: 'note deleted' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
