import { Router } from 'express'
import { createReminder, deleteReminderById, getAllReminder, getReminderById, updateReminderById, getFilterDate } from '../controllers/reminder'

export const reminderRoute = Router()

reminderRoute.post('/create', createReminder)
reminderRoute.get('/get/all/:userId', getAllReminder)
reminderRoute.get('/get/:userId/:dateFilter', getFilterDate)
reminderRoute.get('/get/:reminderId', getReminderById)
reminderRoute.put('/update/:reminderId', updateReminderById)
reminderRoute.delete('/delete/:reminderId/:userId', deleteReminderById)
