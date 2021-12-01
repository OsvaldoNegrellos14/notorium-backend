import { Router } from 'express'
import { createNote, deleteNoteById, getAllNote, getNoteById, updateNoteById } from '../controllers/note'

export const noteRoute = Router()

noteRoute.post('/create', createNote)
noteRoute.get('/get/all/:userId', getAllNote)
noteRoute.get('/get/:noteId', getNoteById)
noteRoute.put('/update/:noteId', updateNoteById)
noteRoute.delete('/delete/:noteId/:userId', deleteNoteById)
