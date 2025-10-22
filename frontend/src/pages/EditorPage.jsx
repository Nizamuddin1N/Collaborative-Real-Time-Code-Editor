import { useParams } from "react-router-dom"
import CodeEditor from "../components/CodeEditor"

export default function EditorPage() {
  const { id } = useParams()

  return (
    <div>
      <h2>Collaborative Code Editor (Single User)</h2>
      <CodeEditor docId={id} />
    </div>
  )
}
