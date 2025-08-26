import { useParams } from "react-router-dom"
import { Fragment, useEffect, useState, lazy, Suspense } from "react"
import { activityService } from "../services/activity"
import { Activity } from "../types/activity"
import BreadCrumb from "../../../components/BreadCrumb"
import Title from "../../../components/Title"
import moment from "moment"
import Loading from "../../../components/Loading"
import { Alert } from "@mui/material"
import ActivityTable from "../components/ActivityTable"

const RecordChart = lazy(() => import("../components/RecordChart"))
const LapsActivity = lazy(() => import("../components/LapsActivity"))
const ZoneTimeChart = lazy(() => import("../components/charts/ZoneTimeChart"))

export default function OneActivityRoute() {
  const { id } = useParams<{ id?: string }>()

  if (!id) return <Alert severity="warning">Activity not founded</Alert>

  return (
    <Suspense fallback={<Loading />}>
      <OneActivity id={id} />
    </Suspense>
  )
}

function OneActivity({ id }: { id: string }) {
  const [activity, setActivity] = useState<Activity>()

  const fetchData = async () => {
    const response = await activityService.getActivity(id)
    setActivity(response)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (!activity)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Alert
          sx={{
            marginTop: "1em",
            width: "600px",
            justifyContent: "center",
          }}
          severity="warning"
        >
          Activity not founded
        </Alert>
      </div>
    )

  const breadCrumbItems = [
    {
      key: 0,
      path: "/",
      name: "Home",
    },
    {
      key: 1,
      path: `/activities`,
      name: `Activities`,
    },
    {
      key: 2,
      path: `/activity/${activity.activity_id}`,
      name: `${activity.name}`,
    },
  ]

  return (
    <Fragment>
      <Title
        title={`${activity.name} - ${moment(activity.start_time).format(
          "DD/MM/YYYY"
        )}`}
      />
      <BreadCrumb items={breadCrumbItems} />
      <ActivityTable data={activity} />
      <ZoneTimeChart data={activity} />
      <LapsActivity id={id} />
      <RecordChart id={id} />
    </Fragment>
  )
}
