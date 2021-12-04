/* eslint-disable eqeqeq */
import User from '../models/user'
import Schedule from '../models/schedule'

export const createSchedule = async (req, res, next) => {
  const { activityDate, title, description, urls, repeat, userId } = req.body
  const user = await User.findById(userId)
  const newSchedule = new Schedule({
    activity_date: activityDate,
    title,
    description,
    urls,
    repeat,
    user: user._id
  })
  try {
    const savedSchedule = await newSchedule.save()
    user.schedules = user.schedules.concat(savedSchedule._id)
    await user.save()
    res.status(200).json({ status: true, info: savedSchedule })
  } catch (error) {
    next(error)
  }
}

export const getScheduleById = async (req, res, next) => {
  try {
    const { scheduleId } = req.params
    const schedule = await Schedule.findById(scheduleId)
    res.status(200).json({ status: true, info: schedule })
  } catch (error) {
    next(error)
  }
}

export const getAllSchedule = async (req, res, next) => {
  try {
    const { userId } = req.params
    const schedules = await Schedule.find({ user: userId })
    res.status(200).json({ status: true, info: schedules })
  } catch (error) {
    next(error)
  }
}

export const updateScheduleById = async (req, res, next) => {
  try {
    const { scheduleId } = req.params
    const { activityDate, title, description, urls, repeat } = req.body
    const scheduleUpdate = {
      activity_date: activityDate,
      title,
      description,
      urls,
      repeat,
      date_at_updated: Date.now()
    }
    const schedule = await Schedule.findByIdAndUpdate(scheduleId, scheduleUpdate, { new: true })
    res.status(200).json({ success: true, info: schedule })
  } catch (error) {
    next(error)
  }
}

export const deleteScheduleById = async (req, res, next) => {
  try {
    const { scheduleId, userId } = req.params
    const user = await User.findById(userId)
    const schedules = await user.schedules.filter((schedule) => schedule._id != scheduleId)
    await Schedule.findByIdAndRemove(scheduleId)
    user.schedules = schedules
    await user.save()
    res.status(200).json({ status: true, info: 'schedule deleted' })
  } catch (error) {
    next(error)
  }
}
