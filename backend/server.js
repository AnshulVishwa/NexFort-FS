import express from "express"
import ConnectMongoDB from "./connect.js"
import userRouter from "./Routes/user.js"
import { FormHTML } from "./Utilities/SignupForm.js"
import { LoginFormHTML } from "./Utilities/LoginForm.js"
import cookie_parser from "cookie-parser"

const app = express()
const PORT = 5000

// Middlewares
app.use(cookie_parser())
app.use(express.urlencoded({extended : false}))
// Middlewares

// Connection MongoDB
ConnectMongoDB( "mongodb://127.0.0.1:27017/" , "NexFort-FS" )
// Connection MongoDB

// Routes
app.use( "/user" , userRouter )
// Routes

app.get( "/signup" , (req , res) => {
    res.send(FormHTML)
} )
app.get( "/login" , (req , res) => {
    res.send(LoginFormHTML)
} )

app.listen( PORT , 
    () => console.log("Server at : http://localhost:5000/") 
)