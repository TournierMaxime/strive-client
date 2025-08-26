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
  Button,
} from "@mui/material"
import { activityService } from "../services/activity"
import { Delete } from "@mui/icons-material"
import DeleteLapActivity from "../utils/DeleteLapActivity"
import useHandleLapActivity from "../hooks/useHandleLapActivity"

export default function LapsActivity({ id }: { id: string }) {
  const { handleOpen, ...modalState } = useHandleLapActivity()
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
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            {lapsActivity &&
              lapsActivity.activity.map((activity: Lap) => {
                const movingTime = activity.moving_time.split(".")
                return (
                  <TableBody key={activity.lap}>
                    <TableRow>
                      <TableCell>Lap {activity.lap}</TableCell>
                      <TableCell>{activity.distance.toFixed(1)}</TableCell>
                      <TableCell>{movingTime[0]}</TableCell>
                      <TableCell>{activity.calories}</TableCell>
                      <TableCell>{activity.avg_hr}</TableCell>
                      <TableCell>{activity.max_hr}</TableCell>
                      <TableCell>{activity.avg_speed.toFixed(2)}</TableCell>
                      <TableCell>{activity.max_speed.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          endIcon={<Delete />}
                          onClick={() => handleOpen(activity.lap)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )
              })}
          </Table>
        </TableContainer>
      </Card>
      <DeleteLapActivity
        id={id}
        setLapsActivity={setLapsActivity}
        {...modalState}
      />
    </Fragment>
  )
}
