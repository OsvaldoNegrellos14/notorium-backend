/* eslint-disable eqeqeq */
import Routine from '../models/routine'
import Exercise from '../models/exercise'

export const createExercise = async (req, res, next) => {
  const { name, duration, description, routineId } = req.body
  const routine = await Routine.findById(routineId)
  const newExercise = new Exercise({
    name,
    duration,
    description,
    routine: routine._id
  })
  try {
    const savedExercise = await newExercise.save()
    routine.exercises = routine.exercises.concat(savedExercise._id)
    await routine.save()
    res.status(200).json({ status: true, info: savedExercise })
  } catch (error) {
    next(error)
  }
}

export const getExerciseById = async (req, res, next) => {
  try {
    const { exerciseId } = req.params
    const exercise = await Exercise.findById(exerciseId)
    res.status(200).json({ status: true, info: exercise })
  } catch (error) {
    next(error)
  }
}

export const getAllExercise = async (req, res, next) => {
  try {
    const { routineId } = req.params
    const exercises = await Exercise.find({ routine: routineId })
    res.status(200).json({ status: true, info: exercises })
  } catch (error) {
    next(error)
  }
}

export const updateExerciseById = async (req, res, next) => {
  try {
    const { exerciseId } = req.params
    const { name, duration, description } = req.body
    const exerciseUpdate = {
      name,
      duration,
      description
    }
    const exercise = await Exercise.findByIdAndUpdate(exerciseId, exerciseUpdate, { new: true })
    res.status(200).json({ success: true, info: exercise })
  } catch (error) {
    next(error)
  }
}

export const deleteExerciseById = async (req, res, next) => {
  try {
    const { exerciseId, routineId } = req.params
    const routine = await Routine.findById(routineId)
    const exercises = await routine.exercises.filter((exercise) => exercise._id != exerciseId)
    await Exercise.findByIdAndRemove(exerciseId)
    routine.exercises = exercises
    await routine.save()
    res.status(200).json({ status: true, info: 'exercise deleted' })
  } catch (error) {
    next(error)
  }
}
