import express from "express"
import { LoginUser, SignupUser } from "../Controllers/user.js"

const userRouter = express.Router()

userRouter.post( "/login" , LoginUser )
userRouter.post( "/signup" , SignupUser )

export default userRouter