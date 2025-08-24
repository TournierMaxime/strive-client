import BasicStats from "../components/BasicStats"
import PercentFCE from "../components/PercentFCE"
import Activities from "../components/Activities"
import TrainingZone from "../components/TrainingZone"
import Button from "../components/Button"

export default function Home() {
  return (
    <div style={{ maxWidth: "1440px", margin: "auto" }}>
      <Button />
      <BasicStats />
      <TrainingZone />
      <PercentFCE />
      <Activities />
    </div>
  )
}
