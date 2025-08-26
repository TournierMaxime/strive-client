import { useState, useEffect, Fragment } from "react"
import { Lap, Laps } from "../types/activity"
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

export default function LapsActivity({ id }: { id: string | undefined }) {
  const [lapsActivity, setLapsActivity] = useState<Laps>()

  const fetchData = async () => {
    if (!id) return
    const lapsActivity = await activityService.getActivityLaps(id)

    setLapsActivity(lapsActivity)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <Fragment>
      <Card raised sx={{ marginTop: "1em", marginBottom: "1em" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Laps</TableCell>
                <TableCell>Distance (km/h)</TableCell>
                <TableCell>Moving Time (H:M:S)</TableCell>
                <TableCell>Calories</TableCell>
                <TableCell>Avg HR (hrm)</TableCell>
                <TableCell>Max HR (hrm)</TableCell>
                <TableCell>Avg Speed (km/h)</TableCell>
                <TableCell>Max Speed (km/h)</TableCell>
              </TableRow>
            </TableHead>
            {lapsActivity &&
              lapsActivity.activity.map((activity: Lap) => {
                const movingTime = activity.moving_time.split(".")
                return (
                  <TableBody key={activity.lap}>
                    <TableRow>
                      <TableCell>Lap {activity.lap++}</TableCell>
                      <TableCell>{activity.distance.toFixed(1)}</TableCell>
                      <TableCell>{movingTime[0]}</TableCell>
                      <TableCell>{activity.calories}</TableCell>
                      <TableCell>{activity.avg_hr}</TableCell>
                      <TableCell>{activity.max_hr}</TableCell>
                      <TableCell>{activity.avg_speed.toFixed(2)}</TableCell>
                      <TableCell>{activity.max_speed.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                )
              })}
          </Table>
        </TableContainer>
      </Card>
    </Fragment>
  )
}
