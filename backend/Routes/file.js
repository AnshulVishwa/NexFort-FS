import express from "express"
import { DownloadFile, FileUpload, IsThereAnyFileForMe } from "../Controllers/file.js"
import { upload } from "../Utilities/multer.js"

const FileRouter = express.Router()

FileRouter.post("/upload" , upload.single("file") , FileUpload)
FileRouter.get("/download" , DownloadFile)
FileRouter.get("/isFile" , IsThereAnyFileForMe)

export default FileRouter