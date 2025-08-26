import { Suspense } from "react"
import BasicStats from "../features/activity/components/BasicStats"
import PercentFCE from "../features/activity/components/PercentFCE"
import TrainingZone from "../features/activity/components/TrainingZone"
import Loading from "../components/Loading"

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <BasicStats />
      <TrainingZone />
      <PercentFCE />
    </Suspense>
  )
}
