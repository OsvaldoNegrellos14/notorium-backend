/* eslint-disable eqeqeq */
import User from '../models/user'
import Routine from '../models/routine'

export const createRoutine = async (req, res, next) => {
  const { name, description, userId } = req.body
  const user = await User.findById(userId)
  const newRoutine = new Routine({
    name,
    description,
    user: user._id
  })
  try {
    const savedRoutine = await newRoutine.save()
    user.routines = user.routines.concat(savedRoutine._id)
    await user.save()
    res.status(200).json({ status: true, info: savedRoutine })
  } catch (error) {
    next(error)
  }
}

export const getRoutineById = async (req, res, next) => {
  try {
    const { routineId } = req.params
    const routine = await Routine.findById(routineId)
    res.status(200).json({ status: true, info: routine })
  } catch (error) {
    next(error)
  }
}

export const getAllRoutine = async (req, res, next) => {
  try {
    const { userId } = req.params
    const routines = await Routine.find({ user: userId })
    res.status(200).json({ status: true, info: routines })
  } catch (error) {
    next(error)
  }
}

export const updateRoutineById = async (req, res, next) => {
  try {
    const { routineId } = req.params
    const { title, description, exercises } = req.body
    const routineUpdate = {
      title,
      description,
      exercises,
      date_at_updated: Date.now()
    }
    const routine = await Routine.findByIdAndUpdate(routineId, routineUpdate, { new: true })
    res.status(200).json({ success: true, info: routine })
  } catch (error) {
    next(error)
  }
}

export const deleteRoutineById = async (req, res, next) => {
  try {
    const { routineId, userId } = req.params
    const user = await User.findById(userId)
    const routines = await user.routines.filter((routine) => routine._id != routineId)
    await Routine.findByIdAndRemove(routineId)
    user.routines = routines
    await user.save()
    res.status(200).json({ status: true, info: 'routine deleted' })
  } catch (error) {
    next(error)
  }
}
