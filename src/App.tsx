import { useEffect, useState } from "react"
import "./App.css"
import { striveApi } from "./services/strive"
import moment from "moment"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
} from "@mui/material"

interface Props {
  activities: Activity[]
  meta: {
    limit: number
    offset: number
    total: number
  }
}

type Activity = {
  activity_id: string
  name: string
  description: null
  type: string
  course_id: null
  laps: number
  sport: string
  sub_sport: string
  device_serial_number: null
  self_eval_feel: null
  self_eval_effort: null
  training_load: null
  training_effect: number
  anaerobic_training_effect: null
  start_time: string
  stop_time: string
  elapsed_time: string
  moving_time: string
  distance: number
  cycles: number
  avg_hr: number
  max_hr: number
  avg_rr: null
  max_rr: null
  calories: number
  avg_cadence: number
  max_cadence: number
  avg_speed: number
  max_speed: number
  ascent: number
  descent: number
  max_temperature: number
  min_temperature: null
  avg_temperature: number
  start_lat: number
  start_long: number
  stop_lat: number
  stop_long: number
  hr_zones_method: string
  hrz_1_hr: number
  hrz_2_hr: number
  hrz_3_hr: number
  hrz_4_hr: number
  hrz_5_hr: number
  hrz_1_time: string
  hrz_2_time: string
  hrz_3_time: string
  hrz_4_time: string
  hrz_5_time: string
}

function App() {
  const [data, setData] = useState<Props>()

  const fetchData = async (opts?: { offset?: number; limit?: number }) => {
    const limit = opts?.limit ?? data?.meta.limit ?? 10
    const offset = opts?.offset ?? data?.meta.offset ?? 0
    const response = await striveApi.getActivities({ offset, limit })
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

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Distance (km)</TableCell>
            <TableCell>Moving Time</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
          </TableRow>
        </TableHead>
        {data &&
          data.activities.map((activity) => {
            const movingTime = activity.moving_time.split(".") // take first index to remove ms
            return (
              <TableBody key={activity.activity_id}>
                <TableRow>
                  <TableCell
                    style={{
                      paddingTop: "1em",
                      paddingBottom: "1em",
                      paddingRight: "1em",
                    }}
                  >
                    {activity.activity_id}
                  </TableCell>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.distance.toFixed(2)}</TableCell>
                  <TableCell>{movingTime[0]}</TableCell>
                  <TableCell>
                    {moment(activity.start_time).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell>
                    {moment(activity.stop_time).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
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
  )
}

export default App
