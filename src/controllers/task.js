/* eslint-disable eqeqeq */
import Task from '../models/task'
import HistoryPomodoro from '../models/history_pomodoro'

export const createTask = async (req, res, next) => {
  const { name, description, timeAprox, historyPomodoroId } = req.body
  const historyPomodoro = await HistoryPomodoro.findById(historyPomodoroId)
  const newTask = new Task({
    name,
    description,
    time_aprox: timeAprox,
    history_pomodoro: historyPomodoro._id
  })
  try {
    const savedTask = await newTask.save()
    historyPomodoro.task = historyPomodoro.task.concat(savedTask._id)
    await historyPomodoro.save()
    res.status(200).json({ status: true, info: savedTask })
  } catch (error) {
    next(error)
  }
}

export const getTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const task = await Task.findById(taskId)
    res.status(200).json({ status: true, info: task })
  } catch (error) {
    next(error)
  }
}

export const getAllTask = async (req, res, next) => {
  try {
    const { historyPomodoroId } = req.params
    const tasks = await Task.find({ history_pomodoro: historyPomodoroId })
    res.status(200).json({ status: true, info: tasks })
  } catch (error) {
    next(error)
  }
}

export const updateTaskById = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const { name, description, timeAprox } = req.body
    const taskUpdate = {
      name,
      description,
      time_aprox: timeAprox
    }
    const task = await Task.findByIdAndUpdate(taskId, taskUpdate, { new: true })
    res.status(200).json({ success: true, info: task })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const { taskId, historyPomodoroId } = req.params
    const historyPomodoro = await HistoryPomodoro.findById(historyPomodoroId)
    const tasks = await historyPomodoro.tasks.filter((task) => task._id != taskId)
    await Task.findByIdAndRemove(taskId)
    historyPomodoro.exercises = tasks
    await historyPomodoro.save()
    res.status(200).json({ status: true, info: 'task deleted' })
  } catch (error) {
    next(error)
  }
}
