import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/editor/:id" element={<EditorPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
