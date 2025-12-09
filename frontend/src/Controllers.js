import axios from "axios";
import { getValues } from "../Utilities/Info";

export async function handleFormSubmit(e) {
    e.preventDefault() // Stop page reload

    const formData = new FormData();

    formData.append("username", getValues()[0]);
    formData.append("number", e.target.number.value); 

    formData.append("file", e.target.file.files[0]); 

    try {
        const res = await axios.post("http://localhost:5000/file/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // Optional, but good practice
        }
        }) 
        console.log("Success:", res.data);
        alert("File Sent! 🚀");
    } catch (error) {
        console.error("Error uploading:", error);
    }
}

export async function IsThereAnyFileForMe() {
    try {
        console.log(getValues());
        
        const res = await axios.get(`http://localhost:5000/file/isFile?number=${getValues()[1]}`)
        
        if(res.data.success == "File Found")
            return res.data.fileNames
        return []
    } catch (error) {
        console.log(err);
        return []
    }
}

export async function DownloadFile(name) {
    try {
        const response = await axios.get(
            `http://localhost:5000/file/download?number=${getValues()[1]}&f_name=${name}`
            , {
            responseType: 'blob', 
            withCredentials: true 
        });

        // 1. Extract filename from headers
        // The header looks like: 'attachment; filename="image_123.png"'
        let filename = response.headers['x-filename'];; // Default fallback

        // 2. Create URL
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        
        // 3. Use the extracted filename
        link.setAttribute('download', name); 

        document.body.appendChild(link);
        link.click();
        
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

        return "File Downloaded Successfully ✅";

    } catch (error) {
        console.error("Download failed:", error);
        return "Download Failed ❌";
    }
}