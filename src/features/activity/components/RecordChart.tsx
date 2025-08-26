import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Record, Records } from "../types/activity"
import moment from "moment"
import { activityService } from "../services/activity"
import { Card } from "@mui/material"

export default function RecordChart({ id }: { id: string | undefined }) {
  const [activityRecords, setActivityRecords] = useState<Records>()

  const fetchData = async () => {
    if (!id) return
    const activityRecords = await activityService.getActivityRecords(id)

    const chartData = activityRecords.activity.map((record: Record) => {
      const { timestamp, hr } = record
      return {
        time: moment(timestamp).format("HH:mm"),
        hr,
      }
    })

    setActivityRecords({
      activity: activityRecords.activity,
      chartData,
    })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <Card raised sx={{ marginTop: "1em", marginBottom: "1em", padding: "1em" }}>
      {activityRecords && (
        <ResponsiveContainer width="100%" height={256}>
          <LineChart data={activityRecords.chartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey="time"
              label={{
                value: "Time (HH:MM)",
                position: "insideBottomLeft",
                offset: -20,
              }}
            />
            <YAxis
              label={{
                value: "Heart Rate (hrm)",
                angle: -90,
                position: "insideBottomLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hr" stroke="#8884d8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
