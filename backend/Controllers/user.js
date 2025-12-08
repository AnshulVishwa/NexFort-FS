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

// Make sure you have imported your User model and AssignToken function
// import USER from '../models/UserSchema.js'; 
// import { AssignToken } from '../Utilities/TokenHelpers.js';

export async function LoginUser(req, res) {
    try {
        const { username, number, password } = req.body;

        // 1. Validation: Ensure all fields are present
        if (!username || !password || !number) {
            throw new Error("Missing required fields 📝");
        }

        // 2. Find User
        // Note: checking password in plain text is not secure for production. 
        // Ideally, use bcrypt.compare(password, user.password)
        console.log(username , password , number);
        
        const user = await USER.findOne({ username, number, password });

        // 3. Check if user exists
        if (!user) {
            throw new Error("Invalid Credentials or User not found ❌");
        }

        // 4. Generate Token (Cookie)
        AssignToken(res, { username, number });
         
        res.json({
            message: "Login Success",
            redirect: true
        });

    } catch (error) {
        console.log("Login Failed:", error.message);
        
        // Return 200 OK but with redirect false so frontend handles it gracefully
        res.json({
            message: error.message,
            redirect: false
        });
    }
}