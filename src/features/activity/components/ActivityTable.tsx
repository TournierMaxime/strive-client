import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material"
import { Activity } from "../types/activity"
import moment from "moment"

export default function dataTable({ activity }: { activity: Activity }) {
  const movingTime = activity.moving_time.split(".")
  const zonesHRTime = [
    {
      key: 0,
      time: activity.hrz_1_time,
      hrm: activity.hrz_1_hr,
    },
    {
      key: 1,
      time: activity.hrz_2_time,
      hrm: activity.hrz_2_hr,
    },
    {
      key: 2,
      time: activity.hrz_3_time,
      hrm: activity.hrz_3_hr,
    },
    {
      key: 3,
      time: activity.hrz_4_time,
      hrm: activity.hrz_4_hr,
    },
    {
      key: 4,
      time: activity.hrz_5_time,
      hrm: activity.hrz_5_hr,
    },
  ]

  return (
    <Card raised sx={{ marginTop: "1em", marginBottom: "1em" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Distance (km/h)</TableCell>
              <TableCell>Moving Time (H:M:S)</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Avg HR (hrm)</TableCell>
              <TableCell>Max HR (hrm)</TableCell>
              <TableCell>Zones HR Time (H:M:S)</TableCell>
              <TableCell>Avg Speed (km/h)</TableCell>
              <TableCell>Max Speed (km/h)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>{activity.distance.toFixed(1)}</TableCell>
              <TableCell>{movingTime[0]}</TableCell>
              <TableCell>{activity.calories}</TableCell>
              <TableCell>{activity.avg_hr}</TableCell>
              <TableCell>{activity.max_hr}</TableCell>
              {zonesHRTime.map((zone) => {
                return (
                  <TableRow key={zone.key}>
                    <TableCell>{zone.hrm}</TableCell>
                    <TableCell>{zone.time}</TableCell>
                  </TableRow>
                )
              })}

              <TableCell>{activity.avg_speed.toFixed(2)}</TableCell>
              <TableCell>{activity.max_speed.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
