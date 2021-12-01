/* eslint-disable no-empty */
import bcrypt from 'bcrypt'
import User from '../models/user'
import jwt from 'jsonwebtoken'

// Method to create a new user
export const createUser = async (req, res) => {
  try {
    const { name, lastname, username, email, password } = req.body

    const userFinded = await User.findOne({ email })
    if (userFinded) {
      res.status(400).json({ success: false, info: 'The email is already in use' })
    } else {
      const passwordHash = await bcrypt.hash(password, 10)

      const user = new User({
        name,
        lastname,
        username,
        email,
        password: passwordHash
      })
      const saveUser = await user.save()
      res.status(201).json({ sucess: true, info: saveUser })
    }
  } catch (error) {
    res.status(400).json({ success: false, info: error })
  }
}

// Method to validate the user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    next({ name: 'MissingData' })
  } else {
    const user = await User.findOne({ email })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
      next({ name: 'false' })
    } else {
      const userDataToken = {
        id: user.id,
        email: user.email
      }

      const token = jwt.sign(userDataToken, process.env.SECRET)

      res.status(200).json({
        name: user.name,
        email: user.email,
        token
      })
    }
  }
}

export const getUserByID = async (req, res, next) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    // console.log(req.params)
    // console.log(user)
    res.status(200).json({ status: true, info: user })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ status: true, info: users })
  } catch (error) {
    next(error)
  }
}
