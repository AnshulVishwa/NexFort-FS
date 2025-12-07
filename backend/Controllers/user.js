import { USER } from "../Models/USER.js"
import { AssignToken, ValidateToken } from "../Security/Token.js"

export async function SignupUser(req , res) {
    try {
        const {username , number , password} = req.body
        const new_user = await USER.create({username , number , password})
        if( !new_user ) throw(new Error("Error Creating User"))
        AssignToken(res , {username , number})
    
        res.send( "User Signed In" )
    } catch (error) {
        console.log(error)
        res.send("Some Error Occured")
    }
}

export async function LoginUser(req , res) {
    try {
        const {username , number , password} = req.body
        const user = await USER.findOne({username , number , password})
        if( !user ) throw( new Error("User not logged in") )
        AssignToken(res , {username , number})
         
        res.send( "Login Success" )
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}