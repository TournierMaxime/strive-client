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

export default function dataTable({ data }: { data: Activity }) {
  const movingTime = data.moving_time.split(".")
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
              <TableCell>{data.distance.toFixed(1) ?? data.distance}</TableCell>
              <TableCell>{movingTime[0]}</TableCell>
              <TableCell>
                {moment(data.start_time).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>
                {moment(data.start_time).format("HH:mm a") +
                  " to " +
                  moment(data.stop_time).format("HH:mm a")}
              </TableCell>
              <TableCell>{data.calories}</TableCell>
              <TableCell>{data.avg_hr}</TableCell>
              <TableCell>{data.max_hr}</TableCell>
              <TableCell>
                {data.avg_speed.toFixed(2) ?? data.avg_speed}
              </TableCell>
              <TableCell>
                {data.max_speed.toFixed(2) ?? data.max_speed}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
