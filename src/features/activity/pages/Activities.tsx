import { useState, useEffect, Fragment } from "react"
import moment from "moment"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Card,
} from "@mui/material"
import { activityService } from "../services/activity"
import { Activity } from "../types/activity"
import Button from "../components/Button"
import BreadCrumb from "../../../components/BreadCrumb"

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

  const fetchData = async (opts?: { offset?: number; limit?: number }) => {
    const limit = opts?.limit ?? data?.meta.limit ?? 10
    const offset = opts?.offset ?? data?.meta.offset ?? 0
    const response = await activityService.getActivities({ offset, limit })
    setData(response)
  }

  const page = Math.floor(
    ((data?.meta.offset ?? 0) as number) / ((data?.meta.limit ?? 1) as number)
  )
  const rowsPerPage = data?.meta.limit ?? 10

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

  return (
    <Fragment>
      <BreadCrumb items={breadCrumbItems} />
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
                <TableCell>Time</TableCell>
                <TableCell>Avr HR (bpm)</TableCell>
                <TableCell>Max HR (bpm)</TableCell>
                <TableCell>Avr Speed (km/h)</TableCell>
                <TableCell>Max Speed (km/h)</TableCell>
              </TableRow>
            </TableHead>
            {data &&
              data.activities.map((activity) => {
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
                      <TableCell>{activity.distance.toFixed(2)}</TableCell>
                      <TableCell>{movingTime[0]}</TableCell>
                      <TableCell>
                        {moment(activity.start_time).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(activity.start_time).format("HH:mm a") +
                          " to " +
                          moment(activity.stop_time).format("HH:mm a")}
                      </TableCell>
                      <TableCell>{activity.avg_hr}</TableCell>
                      <TableCell>{activity.max_hr}</TableCell>
                      <TableCell>{activity.avg_speed.toFixed(2)}</TableCell>
                      <TableCell>{activity.max_speed.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                )
              })}
          </Table>
          <TablePagination
            style={{ display: "flex", justifyContent: "center" }}
            component="div"
            count={data?.meta.total ?? -1} // -1 si ton API ne renvoie pas le total
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, newPage) => {
              const nextOffset = newPage * rowsPerPage
              fetchData({ offset: nextOffset, limit: rowsPerPage })
            }}
            onRowsPerPageChange={(e) => {
              const newLimit = parseInt(e.target.value, 10)
              fetchData({ offset: 0, limit: newLimit }) // reset à la première page
            }}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </TableContainer>
      </Card>
    </Fragment>
  )
}
