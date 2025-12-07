import { FILE_M } from "../Models/FILE_M.js"
import { upload } from "../Utilities/multer.js"

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
      download: false
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
        const isFile = await FILE_M.findOne({sentTo : number})
        if( !isFile ) throw new Error("NO File Found")
        res.json({success : "File Found"})
    } catch (error) {
        res.json({success : error.message})
    }
}

export async function DownloadFile( req , res ){
    try {
        const {number} = req.query
        const load = await FILE_M.findOne({sentTo : number})
        console.log(load);
        
        const filename = await load.file_name
        res.download(`./uploads/${filename}`)
    } catch (error) {
        res.json({error : error.message})
    }
}