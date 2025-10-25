import { useState, useEffect, useRef } from "react"
import Editor from "@monaco-editor/react"
import axios from "axios"
import VersionPanel from "./VersionsPanel"

export default function CodeEditor({ docId }) {
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("Saved")
  const [versions, setVersions] = useState([])
  const isInitialLoad = useRef(true)

  useEffect(() => {
    axios.get(`http://localhost:5000/document/${docId}`)
      .then(res => {
        setContent(res.data.content)
        isInitialLoad.current = false
      })
      .catch(err => console.error(err))
  }, [docId])

  useEffect(() => {
    if (isInitialLoad.current) return
    if (!content) return
    const timer = setTimeout(() => {
      setStatus("Saving...")
      axios.put(`http://localhost:5000/document/${docId}`, { content })
        .then(() => {
          setStatus("Saved")
          fetchVersions()
        })
        .catch(() => setStatus("Error"))
    }, 2000)
    return () => clearTimeout(timer)
  }, [content, docId])

  const fetchVersions = () => {
    axios.get(`http://localhost:5000/document/${docId}/versions`)
      .then(res => setVersions(res.data.reverse()))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchVersions()
  }, [docId])

  const handleRestore = (versionContent) => {
    setContent(versionContent)
  }

  return (
    <div style={{ display: "flex", gap: "20px", backgroundColor: "#000", height: "100vh", color: "#fff" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "5px", color: "#0f0" }}>Status: {status}</div>
        <Editor
          height="100%"
          theme="vs-dark" // ✅ Monaco dark theme
          language="javascript"
          value={content}
          onChange={setContent}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            padding: { top: 10 },
          }}
        />
      </div>
      <VersionPanel versions={versions} onRestore={handleRestore} />
    </div>
  )
}
