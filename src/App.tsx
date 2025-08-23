import "./App.css"
import BasicStats from "./components/BasicStats"
import PercentFCE from "./components/PercentFCE"
import Activities from "./components/Activities"
import TrainingZone from "./components/TrainingZone"

function App() {
  return (
    <div style={{ maxWidth: "1440px", margin: "auto" }}>
      <BasicStats />
      <TrainingZone />
      <PercentFCE />
      <Activities />
    </div>
  )
}

export default App
