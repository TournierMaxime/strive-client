import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import OneActivity from "./pages/OneActivity"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/activity/:id" element={<OneActivity />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
