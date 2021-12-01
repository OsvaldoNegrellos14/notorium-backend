import { userRoute } from '../routes/user'
import { noteRoute } from './note'
import { reminderRoute } from './reminder'
import { scheduleRoute } from './schedule'
import handleErros from '../middlewares/handleErros'
import notFound from '../middlewares/notFound'
import { routineRoute } from './routine'
import { exerciseRoute } from './exercise'

module.exports = (app) => {
  app.use('/api/users', userRoute)
  app.use('/api/notes', noteRoute)
  app.use('/api/reminders', reminderRoute)
  // los de abajo aun falta revisar
  app.use('/api/schedule', scheduleRoute)
  app.use('/api/routine', routineRoute)
  app.use('/api/exercise', exerciseRoute)
  // app.use('/api/history/pomodoro', historyPomodoroRoute)
  // app.use('/api/pomodoro', pomodoroRoute)
  // app.use('/api/task', taskRoute)
  app.use(notFound)
  app.use(handleErros)
}
