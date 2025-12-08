import express from "express"
import ConnectMongoDB from "./connect.js"
import userRouter from "./Routes/user.js"
import { FormHTML } from "./Utilities/SignupForm.js"
import { LoginFormHTML } from "./Utilities/LoginForm.js"
import cookie_parser from "cookie-parser"
import FileRouter from "./Routes/file.js"
import { Form } from "./Utilities/Form.js"
import VerifyToken_Middleware from "./Middleware/token.js"
import cors from "cors"
import { DownloadFile } from "./Utilities/DownloadFile.js"
import { CheckForFile } from "./Utilities/CheckForFile.js"
import { ValidateToken } from "./Security/Token.js"

const app = express()
const PORT = 5000

// Middlewares
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
    exposedHeaders: ["X-Filename"]
})),

app.use(cookie_parser())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
// Middlewares

// Connection MongoDB
ConnectMongoDB( "mongodb://127.0.0.1:27017/" , "NexFort-FS" )
// Connection MongoDB

// Routes
app.use( "/user" , userRouter )
app.use( "/file" , FileRouter )
// Routes


app.get( "/" , VerifyToken_Middleware , (req , res) => {
    res.send(Form)
} )

app.get( "/verify" , ValidateToken )

app.get( "/download" , (req , res) => res.send(DownloadFile) )

app.get( "/isFile" , (req , res) => res.send(CheckForFile) )

app.get( "/signup" , (req , res) => {
    res.send(FormHTML)
} )
app.get( "/login" , (req , res) => {
    res.send(LoginFormHTML)
} )


app.listen( PORT , 
    () => console.log("Server at : http://localhost:5000/") 
)