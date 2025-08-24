import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card } from "@mui/material"
import { Activity } from "../../types/activity"

export default function ZoneTimeChart({ data }: { data: Activity }) {
  const zones = [
    {
      key: 0,
      time: data?.hrz_1_time.split(".")[0] + " (Z1)",
      hrm: data?.hrz_1_hr,
    },
    {
      key: 1,
      time: data?.hrz_2_time.split(".")[0] + " (Z2)",
      hrm: data?.hrz_2_hr,
    },
    {
      key: 2,
      time: data?.hrz_3_time.split(".")[0] + " (Z3)",
      hrm: data?.hrz_3_hr,
    },
    {
      key: 3,
      time: data?.hrz_4_time.split(".")[0] + " (Z4)",
      hrm: data?.hrz_4_hr,
    },
    {
      key: 4,
      time: data?.hrz_5_time.split(".")[0] + " (Z5)",
      hrm: data?.hrz_5_hr,
    },
  ]
  return (
    <Card raised sx={{ marginTop: "1em", marginBottom: "1em", padding: "1em" }}>
      <ResponsiveContainer width="100%" height={256}>
        <BarChart data={zones}>
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
          <Bar
            barSize={100}
            type="monotone"
            dataKey="hrm"
            stroke="#fff"
            fill="#d30f0fff"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
