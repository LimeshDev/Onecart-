import express from "express";
import { adminLogin, googleLogin, Login, logOut, registration } from "../controller/authController.js";

const authRoute = express.Router()

authRoute.post('/registration', registration)
authRoute.post('/Login', Login)
authRoute.get('/logOut', logOut)
authRoute.post('/googlelogin', googleLogin)
authRoute.post('/adminLogin', adminLogin)



export default authRoute;