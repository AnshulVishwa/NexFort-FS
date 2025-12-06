import jwt from "jsonwebtoken"
const SecretKey = "AnshulVishwa2205"

export function AssignToken( res , payload ) {
    const token = jwt.sign( payload , SecretKey )
    res.cookie("token" , token)
}

export function ValidateToken( req ){
    const token = req.cookies.token
    const verify = jwt.verify( token , SecretKey )
    if( !verify ) return "error"
    return "success"
}