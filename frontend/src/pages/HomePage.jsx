import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()

  const createNewDoc = async () => {
    const res = await axios.post("http://localhost:5000/document", { title: "New File" })
    navigate(`/editor/${res.data._id}`)
  }

  return (
    <div>
      <h1>Welcome to Collaborative Code Editor</h1>
      <button onClick={createNewDoc}>New Document</button>
    </div>
  )
}
