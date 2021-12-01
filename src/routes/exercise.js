import { Router } from 'express'
import { createExercise, deleteExerciseById, getAllExercise, getExerciseById, updateExerciseById } from '../controllers/exercise'

export const exerciseRoute = Router()

exerciseRoute.post('/create', createExercise)
exerciseRoute.get('get/all/:routineId', getAllExercise)
exerciseRoute.get('/get/:exerciseId', getExerciseById)
exerciseRoute.put('/update/:exerciseId', updateExerciseById)
exerciseRoute.delete('/delete/:exerciseId/:routineId', deleteExerciseById)
