import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import OneActivity from "./features/activity/pages/OneActivity"
import Nav from "./components/Nav"
import Activities from "./features/activity/pages/Activities"
import { Box } from "@mui/material"
import { Fragment } from "react"
import Title from "./components/Title"

function App() {
  return (
    <Fragment>
      <Title title="Strive" />
      <Box sx={{ maxWidth: "1440px", margin: "auto" }}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/activity/:id" element={<OneActivity />} />
            <Route path="/activities" element={<Activities />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Fragment>
  )
}

export default App
