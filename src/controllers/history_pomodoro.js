/* eslint-disable eqeqeq */
import HistoryPomodoro from '../models/history_pomodoro'
import User from '../models/user'

export const createHistoryPomodoro = async (req, res, next) => {
  const { name, duration, restDuration, timeFormat, category, userId } = req.body
  const user = await User.findById(userId)
  const newHistoryPomodoro = new HistoryPomodoro({
    name,
    duration,
    rest_duration: restDuration,
    time_format: timeFormat,
    category,
    user: user._id
  })
  try {
    const savedHistoryPomodoro = await newHistoryPomodoro.save()
    user.pomodoro.history_pomodoros = user.pomodoro.history_pomodoros.concat(savedHistoryPomodoro._id)
    await user.save()
    res.status(200).json({ status: true, info: savedHistoryPomodoro })
  } catch (error) {
    next(error)
  }
}

export const getHistoryPomodoroById = async (req, res, next) => {
  try {
    const { historyPomodoroId } = req.params
    const historyPomodoros = await HistoryPomodoro.findById(historyPomodoroId)
    res.status(200).json({ status: true, info: historyPomodoros })
  } catch (error) {
    next(error)
  }
}

export const getAllHistoryPomodoro = async (req, res, next) => {
  try {
    const { userId } = req.params
    const pomodoros = await HistoryPomodoro.find({ user: userId })
    res.status(200).json({ status: true, info: pomodoros })
  } catch (error) {
    next(error)
  }
}

export const updateHistoryPomodoro = async (req, res, next) => {
  try {
    const { historyPomodoroId } = req.params
    const { name, duration, restDuration, timeFormat, category } = req.body
    const historyPomodoroUpdate = {
      name,
      duration,
      rest_duration: restDuration,
      time_format: timeFormat,
      category,
      date_at_updated: Date.now()
    }
    const historyPomodoro = await HistoryPomodoro.findByIdAndUpdate(historyPomodoroId, historyPomodoroUpdate, { new: true })
    res.status(200).json({ success: true, info: historyPomodoro })
  } catch (error) {
    next(error)
  }
}

export const deleteHistoryPomodoro = async (req, res, next) => {
  try {
    const { historyPomodoroId, userId } = req.params
    const user = await User.findById(userId)
    // res.json(user)
    const historyPomodoros = await user.history_pomodoros.filter((historyPomodoro) => historyPomodoro != historyPomodoroId)
    await HistoryPomodoro.findByIdAndRemove(historyPomodoroId)
    user.pomodoro.history_pomodoros = historyPomodoros
    await user.save()
    res.status(200).json({ status: true, info: 'history pomodoro deleted' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
