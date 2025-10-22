import { useState, useEffect } from "react"
import Editor from "@monaco-editor/react"
import axios from "axios"

export default function CodeEditor({ docId }) {
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("Saved")

  useEffect(() => {
    axios.get(`http://localhost:5000/document/${docId}`)
      .then(res => setContent(res.data.content))
      .catch(err => console.error(err))
  }, [docId])

  useEffect(() => {
    if (!content) return
    const timer = setTimeout(() => {
      setStatus("Saving...")
      axios.put(`http://localhost:5000/document/${docId}`, { content })
        .then(() => setStatus("Saved"))
        .catch(() => setStatus("Error"))
    }, 2000) // auto-save every 2s after stop typing
    return () => clearTimeout(timer)
  }, [content, docId])

  return (
    <div>
      <div style={{ marginBottom: "5px" }}>Status: {status}</div>
      <Editor
        height="500px"
        language="javascript"
        value={content}
        onChange={setContent}
      />
    </div>
  )
}
