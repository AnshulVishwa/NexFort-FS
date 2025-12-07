import jwt from "jsonwebtoken"

export default function VerifyToken_Middleware(req , res , next){
    try {
        const token = req.cookies.token
        if( !token ) throw(new Error("Token not found"))
        jwt.verify(token , "AnshulVishwa2205")
        console.log("verified");
        next()
    } catch (error) {
        console.log("")
        res.redirect("/login")
    }
}