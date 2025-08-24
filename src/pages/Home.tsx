import { Fragment } from "react"
import BasicStats from "../features/activity/components/BasicStats"
import PercentFCE from "../features/activity/components/PercentFCE"
import TrainingZone from "../features/activity/components/TrainingZone"

export default function Home() {
  return (
    <Fragment>
      <BasicStats />
      <TrainingZone />
      <PercentFCE />
    </Fragment>
  )
}
