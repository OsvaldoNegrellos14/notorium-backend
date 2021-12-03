import { Router } from 'express'
import { createHistoryPomodoro, deleteHistoryPomodoro, getAllHistoryPomodoro, getHistoryPomodoroById, updateHistoryPomodoro } from '../controllers/history_pomodoro'

export const historyPomodoroRoute = Router()

historyPomodoroRoute.post('/create', createHistoryPomodoro)
historyPomodoroRoute.get('/get/all/:userId', getAllHistoryPomodoro)
historyPomodoroRoute.get('/get/:historyPomodoroId', getHistoryPomodoroById)
historyPomodoroRoute.put('/update/:historyPomodoroId', updateHistoryPomodoro)
historyPomodoroRoute.delete('/delete/:historyPomodoroId/:userId', deleteHistoryPomodoro)
