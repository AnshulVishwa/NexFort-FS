import axios from "axios";

export default async function ValidateUser() {
    try {
        // ❌ DON'T try to read document.cookie
        // ❌ DON'T pass token in the URL (?token=...)
        
        // ✅ DO let the browser send the cookie automatically
        const res = await axios.get("http://localhost:5000/verify", {
            withCredentials: true // 👈 This is the key! It attaches the hidden cookie.
        });
        
        // Assuming your backend returns { success: true } or similar
        if (res.data.success === true || res.data.message === "Login Success") {
            return true;
        }
        return false;

    } catch (error) {
        console.log("Validation failed:", error);
        return false;
    }
}
