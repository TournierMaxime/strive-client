import { useState, useEffect, Fragment, Suspense } from "react"
import moment from "moment"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Card,
} from "@mui/material"
import { activityService } from "../services/activity"
import { Activity } from "../types/activity"
import Button from "../components/Button"
import BreadCrumb from "../../../components/BreadCrumb"
import ActivityPagination from "../components/ActivityPagination"
import Title from "../../../components/Title"
import Loading from "../../../components/Loading"

interface Props {
  activities: Activity[]
  meta: {
    limit: number
    offset: number
    total: number
  }
}

export default function Activities() {
  const [data, setData] = useState<Props>()

  const fetchData = async (opts?: {
    offset?: number
    limit?: number
  }): Promise<void> => {
    const limit = opts?.limit ?? data?.meta.limit ?? 10
    const offset = opts?.offset ?? data?.meta.offset ?? 0
    const response = await activityService.getActivities({ offset, limit })
    setData(response)
  }

  const offset: number = data?.meta.offset ?? 0

  const limit: number = data?.meta.limit ?? 10

  const count: number = data?.meta.total ?? -1

  const page = Math.floor(offset / limit)

  const rowsPerPage = limit

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const breadCrumbItems = [
    {
      key: 0,
      path: "/",
      name: "Home",
    },
    {
      key: 1,
      path: `/activities/`,
      name: `Activities`,
    },
  ]

  const renderItem = () => {
    if (!data) return null

    return data.activities.map((activity) => {
      const movingTime = activity.moving_time.split(".") // take first index to remove ms
      return (
        <TableBody key={activity.activity_id}>
          <TableRow>
            <TableCell>
              <a href={`/activity/${activity.activity_id}`}>
                {activity.activity_id}
              </a>
            </TableCell>
            <TableCell
              style={{
                paddingTop: "1em",
                paddingBottom: "1em",
                paddingRight: "1em",
              }}
            >
              {activity.name}
            </TableCell>
            <TableCell>{activity.distance?.toFixed(2) ?? "null"}</TableCell>
            <TableCell>{movingTime[0]}</TableCell>
            <TableCell>
              {moment(activity.start_time).format("DD/MM/YYYY")}
            </TableCell>
          </TableRow>
        </TableBody>
      )
    })
  }

  return (
    <Fragment>
      <Title title="Activities" />
      <BreadCrumb items={breadCrumbItems} />
      <Suspense fallback={<Loading />}>
        <Card raised sx={{ marginTop: "1em", marginBottom: "1em" }}>
          <Button title="Sync Data" />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Distance (km)</TableCell>
                  <TableCell>Moving Time (H:M:S)</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              {renderItem()}
            </Table>
            <ActivityPagination
              count={count}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100]}
              fetchData={fetchData}
            />
          </TableContainer>
        </Card>
      </Suspense>
    </Fragment>
  )
}
