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
import { Record } from "../types/activity"
import moment from "moment"
import { activityService } from "../services/activity"
import { Card } from "@mui/material"

export default function RecordChart({ id }: { id: string | undefined }) {
  const [activityRecords, setActivityRecords] = useState<Record[]>([])

  const fetchData = async () => {
    if (!id) return
    const activityRecords = await activityService.getActivityRecords(id)

    const formatted = activityRecords.activity.map((r: Record) => ({
      time: moment(r.timestamp).format("HH:mm"),
      hr: r.hr,
    }))

    setActivityRecords(formatted)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <Card raised sx={{ marginTop: "1em", marginBottom: "1em", padding: "1em" }}>
      <ResponsiveContainer width="100%" height={512}>
        <LineChart data={activityRecords}>
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
    </Card>
  )
}
