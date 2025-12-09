import jwt from "jsonwebtoken"
const SecretKey = "AnshulVishwa2205"

export function AssignToken( res , payload ) {
    const token = jwt.sign( payload , SecretKey )
    res.cookie("token", token, {
        secure: true,       // 👈 MUST be true (Browsers allow this on localhost if SameSite is None)
        sameSite: 'none',   // 👈 REQUIRED for Cross-Site (Vercel -> Localhost)
        maxAge: 24 * 60 * 60 * 1000
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