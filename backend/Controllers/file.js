import path from 'path'; // Import 'path' module
import { FILE_M } from "../Models/FILE_M.js"
import { upload } from "../Utilities/multer.js"
import fs from "fs"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function FileUpload(req, res) {
  try {
    // multer has populated req.file and req.body
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    const { username, number } = req.body;
    const filename = req.file ? req.file.filename : null; // depends on your storage.filename

    await FILE_M.create({
      username,
      sentTo: number,
      file_name: filename || "name",
      downloded: false
    });

    res.json({ success: "File Sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}


export async function IsThereAnyFileForMe(req , res) {
    try {
        const {number} = req.query
        const isFile = await FILE_M.find({sentTo : number , downloded : false})
        
        if( isFile.length == 0 ) throw new Error("NO File Found")
        const allNames = Array(isFile.length).fill("").map( (_,i) => isFile[i].file_name )
        res.json({success : "File Found" , fileNames : allNames})
    } catch (error) {
        res.json({success : error.message})
    }
}

// import FILE_M ...

export async function DownloadFile(req, res) {
    try {
        const { number , f_name } = req.query;
        
        const load = await FILE_M.findOne({ sentTo: number , file_name : f_name });
        
        if (!load) {
            return res.status(404).json({ error: "File record not found" });
        }

        const filePath = path.join(__dirname, '..', 'uploads', f_name);

        if (!fs.existsSync(filePath)) {
            console.error("File missing on disk:", filePath);
            return res.status(404).json({ error: "File missing on server" });
        }

        res.download(filePath, f_name, async (err) => {
            if (err) {
                console.error("Download Error:", err);
                if (!res.headersSent) {
                    return res.status(500).json({ error: "Could not download file" });
                }
                return;
            }

            try {
                console.log("filename :" ,f_name);
                
                const res = await FILE_M.updateOne(
                    { file_name: `${f_name}`, downloded: false }, // Filter: Find file ONLY if strictly not downloded yet
                    { $set: { downloded: true } }              // Update: Mark as true
                );
                console.log(res);
                

                fs.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr) console.error("Error deleting file:", unlinkErr);
                    else console.log(`Deleted ${f_name} 🗑️`);
                });
            } catch (cleanupError) {
                console.error("Cleanup error:", cleanupError);
            }
        });

    } catch (error) {
        console.error("Server Error:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        }
    }
}