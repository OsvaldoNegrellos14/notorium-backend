import { Router } from 'express'
import { createSchedule, deleteScheduleById, getAllSchedule, getScheduleById, updateScheduleById } from '../controllers/schedule'

export const scheduleRoute = Router()

scheduleRoute.post('/create', createSchedule)
scheduleRoute.get('/get/all/:userId', getAllSchedule)
scheduleRoute.get('/get/:scheduleId', getScheduleById)
scheduleRoute.put('/update/:scheduleId', updateScheduleById)
scheduleRoute.delete('/delete/:scheduleId/:userId', deleteScheduleById)
