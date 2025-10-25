import { useParams } from "react-router-dom"
import CodeEditor from "../components/CodeEditor"

export default function EditorPage() {
  const { id } = useParams()
  return (
    <div>
      <CodeEditor docId={id} />
    </div>
  )
}
