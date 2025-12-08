import { useEffect, useState } from 'react'
import './App.css'
import ValidateUser from '../Utilities/ValidateUser'
import { useNavigate } from 'react-router'
import { getValues } from '../Utilities/Info'
import { DownloadFile, handleFormSubmit, IsThereAnyFileForMe } from './Controllers'

function App() {
  const navigate = useNavigate()
  const [showFiles, setShowFiles] = useState(false)
  const [allFiles , setAllFiles] = useState([])
  
  // 1. New State for user info to fix the rendering error
  const [userInfo, setUserInfo] = useState({ name: "", number: "" })

  useEffect(() => {
    // 2. Fix: Define a separate async function INSIDE useEffect
    const initPage = async () => {
      try {
        const verify = await ValidateUser()
        console.log("Verified:", verify);
        
        if (!verify) {
          navigate("/login")
          return // Stop here if not verified
        }

        // 3. Fix: Await the file check function properly
        const hasFiles = await IsThereAnyFileForMe()
        setShowFiles(hasFiles.length == 0 ? false : true)
        setAllFiles(hasFiles)

        // Update user info state safely
        const [name, number] = getValues()
        setUserInfo({ name, number })

      } catch (error) {
        console.error("Error loading page:", error)
      }
    }

    // Call the function immediately
    initPage()
  }, []) // Empty dependency array means run once on mount

  return (
    <>
      <h1>Home Page 🏠</h1>
      <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        {/* 4. Fix: Render the variable, not a function definition */}
        <span>{userInfo.name || "Guest"}</span>
        <span>{userInfo.number || ""}</span>
      </nav>
      
      <form onSubmit={handleFormSubmit}>
        <input type="text" name='number' placeholder='For..?' />
        <input name='file' type='file' />
        <button type='submit'>Submit 🚀</button>
      </form>

      {showFiles
        ? <>
            <div>📂 
                {allFiles.length} File/s Found for You</div>
            <div>Click here to Download that File</div>
            {
              allFiles.map( ( file , i ) => (
                <>
                  <span>{file}</span>
                  <button onClick={DownloadFile}>Download File 📥</button>
                </>
              ) )
            }
          </>
        : null
      }
    </>
  )
}

export default App