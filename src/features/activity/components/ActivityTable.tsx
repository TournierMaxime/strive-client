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
  return (
    <Card raised sx={{ marginTop: "1em", marginBottom: "1em" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Distance (km/h)</TableCell>
              <TableCell>Moving Time (H:M:S)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Avg HR (hrm)</TableCell>
              <TableCell>Max HR (hrm)</TableCell>
              <TableCell>Avg Speed (km/h)</TableCell>
              <TableCell>Max Speed (km/h)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                {activity.distance.toFixed(1) ?? activity.distance}
              </TableCell>
              <TableCell>{movingTime[0]}</TableCell>
              <TableCell>
                {moment(activity.start_time).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                {moment(activity.start_time).format("HH:mm a") +
                  " to " +
                  moment(activity.stop_time).format("HH:mm a")}
              </TableCell>
              <TableCell>{activity.calories}</TableCell>
              <TableCell>{activity.avg_hr}</TableCell>
              <TableCell>{activity.max_hr}</TableCell>
              <TableCell>
                {activity.avg_speed.toFixed(2) ?? activity.avg_speed}
              </TableCell>
              <TableCell>
                {activity.max_speed.toFixed(2) ?? activity.max_speed}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
