import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [docs, setDocs] = useState([])
  const navigate = useNavigate()

  const fetchDocs = () => {
    axios.get("http://localhost:5000/document")
      .then(res => setDocs(res.data))
      .catch(err => console.error(err))
  }

  const createNewDoc = () => {
    axios.post("http://localhost:5000/document", { title: "Untitled File" })
      .then(res => navigate(`/editor/${res.data._id}`))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  return (
    <div style={{ padding: "40px", color: "white", background: "#121212", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "20px" }}>My Files</h1>
      <button
        onClick={createNewDoc}
        style={{
          background: "#007acc",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        + New File
      </button>

      {docs.length === 0 ? (
        <p>No files yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {docs.map(doc => (
            <li key={doc._id} style={{
              background: "#1e1e1e",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "10px",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/editor/${doc._id}`)}>
              <strong>{doc.title}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
