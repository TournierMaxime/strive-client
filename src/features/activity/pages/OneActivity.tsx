import { useParams } from "react-router-dom"
import { Fragment, useEffect, useState } from "react"
import { activityService } from "../services/activity"
import { Activity } from "../types/activity"
import RecordChart from "../components/RecordChart"
import ActivityTable from "../components/ActivityTable"
import BreadCrumb from "../../../components/BreadCrumb"
import LapsActivity from "../components/LapsActivity"
import moment from "moment"
import ZoneTimeChart from "../components/charts/ZoneTimeChart"

export default function OneActivity() {
  const { id } = useParams<{ id: string | undefined }>()
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

  return activity ? (
    <Fragment>
      <BreadCrumb items={breadCrumbItems} />
      <ActivityTable activity={activity} />
      <ZoneTimeChart data={activity} />
      <LapsActivity id={id} />
      <RecordChart id={id} />
    </Fragment>
  ) : null
}
