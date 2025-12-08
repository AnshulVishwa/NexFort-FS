import jwt from "jsonwebtoken"
const SecretKey = "AnshulVishwa2205"

export function AssignToken( res , payload ) {
    const token = jwt.sign( payload , SecretKey )
    res.cookie("token", token, {
        httpOnly: true, // Prevents JavaScript from reading the cookie (Security best practice)
        secure: false,  // 👈 Set to FALSE for localhost (http). Set TRUE for production (https)
        sameSite: 'lax', // Needed for localhost to function properly
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
}

export function ValidateToken( req , res ){
    const token = req.cookies.token; 
    if (!token) return res.json({ success: false, message: "No Token" });

    try {
        jwt.verify( token , SecretKey )
        res.json ({ success: true, message: "Token Verified" })
    } catch (error) {
        console.log(error) 
        res.json ({ success: false, message: "Unverified Token" })
    }
}