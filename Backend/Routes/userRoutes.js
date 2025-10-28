import express from 'express'
import { getAdmin, getcurrentUser } from '../controller/userController.js'
import isAuth from '../middleware/isAuth.js'
import adminAuth from '../middleware/adminAuth.js'
let userRoutes = express.Router()

userRoutes.get('/getCurrentuser', isAuth, getcurrentUser)
userRoutes.get('/getadmin', adminAuth, getAdmin); 


export default userRoutes;