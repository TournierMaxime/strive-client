import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import OneActivity from "./pages/OneActivity"
import Nav from "./components/Nav"

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/activity/:id" element={<OneActivity />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
