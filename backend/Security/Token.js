import jwt from "jsonwebtoken"
const SecretKey = "AnshulVishwa2205"

export function AssignToken( res , payload ) {
    const token = jwt.sign( payload , SecretKey )
    res.cookie("token" , token)
}

export function ValidateToken( req ){
    try {
        const token = req.cookies.token
        jwt.verify( token , SecretKey )
        return "success"
    } catch (error) {
        console.log(error) 
        return "error"
    }
}