/* eslint-disable eqeqeq */
import User from '../models/user'
import Reminder from '../models/reminder'

export const createReminder = async (req, res, next) => {
  const { title, description, rememberDate, userId } = req.body
  const user = await User.findById(userId)
  const newReminder = new Reminder({
    title,
    description,
    remember_date: rememberDate,
    user: user._id
  })
  try {
    const savedReminder = await newReminder.save()
    user.reminders = user.reminders.concat(savedReminder._id)
    await user.save()
    res.status(200).json({ status: true, info: savedReminder })
  } catch (error) {
    next(error)
  }
}

export const getReminderById = async (req, res, next) => {
  try {
    const { reminderId } = req.params
    const reminder = await Reminder.findById(reminderId)
    res.status(200).json({ status: true, info: reminder })
  } catch (error) {
    next(error)
  }
}

export const getAllReminder = async (req, res, next) => {
  try {
    const { userId } = req.params
    const reminders = await Reminder.find({ user: userId })
    res.status(200).json({ status: true, info: reminders })
  } catch (error) {
    next(error)
  }
}

export const updateReminderById = async (req, res, next) => {
  try {
    const { reminderId } = req.params
    const { title, description, rememberDate } = req.body
    const reminderUpdate = {
      title,
      description,
      remember_date: rememberDate,
      date_at_updated: Date.now()
    }
    const reminder = await Reminder.findByIdAndUpdate(reminderId, reminderUpdate, { new: true })
    res.status(200).json({ success: true, info: reminder })
  } catch (error) {
    next(error)
  }
}

export const deleteReminderById = async (req, res, next) => {
  try {
    const { reminderId, userId } = req.params
    const user = await User.findById(userId)
    // res.json(user)
    const reminders = await user.reminders.filter((reminder) => reminder._id != reminderId)
    await Reminder.findByIdAndRemove(reminderId)
    user.reminders = reminders
    await user.save()
    res.status(200).json({ status: true, info: 'reminder deleted' })
  } catch (error) {
    next(error)
  }
}
