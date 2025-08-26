import { useParams } from "react-router-dom"
import { Fragment, useEffect, useState, lazy, Suspense } from "react"
import { activityService } from "../services/activity"
import { Activity } from "../types/activity"
import BreadCrumb from "../../../components/BreadCrumb"
import Title from "../../../components/Title"
import moment from "moment"

const RecordChart = lazy(() => import("../components/RecordChart"))
const ActivityTable = lazy(() => import("../components/ActivityTable"))
const LapsActivity = lazy(() => import("../components/LapsActivity"))
const ZoneTimeChart = lazy(() => import("../components/charts/ZoneTimeChart"))

export default function OneActivityRoute() {
  const { id } = useParams<{ id?: string }>()

  if (!id) return null

  return (
    <Suspense fallback={<div style={{ padding: 16 }}>Chargement…</div>}>
      <OneActivity id={id} />
    </Suspense>
  )
}

function OneActivity({ id }: { id: string }) {
  const [activity, setActivity] = useState<Activity>()

  const fetchData = async () => {
    if (!id) return
    const activity = await activityService.getActivity(id)

    setActivity(activity)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const breadCrumbItems = [
    {
      key: 0,
      path: "/",
      name: "Home",
    },
    {
      key: 1,
      path: `/activity/${activity && activity?.activity_id}`,
      name: `${activity && activity.name}`,
    },
  ]

  if (!activity) return null

  return (
    <Fragment>
      <Title
        title={`${activity.name} - ${moment(activity.start_time).format(
          "DD/MM/YYYY"
        )}`}
      />
      <BreadCrumb items={breadCrumbItems} />
      <ActivityTable activity={activity} />
      <ZoneTimeChart data={activity} />
      <LapsActivity id={id} />
      <RecordChart id={id} />
    </Fragment>
  )
}
