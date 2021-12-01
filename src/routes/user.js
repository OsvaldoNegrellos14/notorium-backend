import { Router } from 'express'
import { createUser, getAllUsers, getUserByID } from '../controllers/user'

export const userRoute = Router()

userRoute.post('/create', createUser)
userRoute.get('/get/all', getAllUsers)
userRoute.get('/get/:userId', getUserByID)
