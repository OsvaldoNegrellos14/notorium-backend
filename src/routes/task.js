import { Router } from 'express'
import { createTask, deleteTask, getAllTask, getTaskById, updateTaskById } from '../controllers/task'

export const taskRoute = Router()

taskRoute.post('/create', createTask)
taskRoute.get('/get/all/:historyPomodoroId', getAllTask)
taskRoute.get('/get/:taskId', getTaskById)
taskRoute.put('/update/:taskId', updateTaskById)
taskRoute.delete('/delete/:taskId/:historyPomodoroId', deleteTask)
