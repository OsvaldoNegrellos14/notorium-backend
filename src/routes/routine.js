import { Router } from 'express'
import { createRoutine, deleteRoutineById, getAllRoutine, getRoutineById, updateRoutineById } from '../controllers/routine'

export const routineRoute = Router()

routineRoute.post('/create', createRoutine)
routineRoute.get('/get/all/:userId', getAllRoutine)
routineRoute.get('/get/:routineId', getRoutineById)
routineRoute.put('/update/:routineId', updateRoutineById)
routineRoute.delete('/delete/:routineId/:userId', deleteRoutineById)
