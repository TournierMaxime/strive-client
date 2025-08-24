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
import { useParams } from "react-router-dom"
import { useEffect, useState, Fragment } from "react"
import { striveApi } from "../services/strive"
import moment from "moment"
import { Card, CardHeader } from "@mui/material"
import type { Activity } from "../components/Activities"

interface Record {
  activity_id: string
  record: number
  timestamp: string
  position_lat: number
  position_long: number
  distance: number
  cadence: number
  altitude: number
  hr: number
  rr: null
  speed: number
  temperature: null
}

export default function OneActivity() {
  const { id } = useParams<{ id: string | undefined }>()
  const [activityRecords, setActivityRecords] = useState<Record[]>([])
  const [activity, setActivity] = useState<Activity>()

  const fetchData = async () => {
    if (!id) return
    const activityRecords = await striveApi.getActivityRecords(id)
    const activity = await striveApi.getActivity(id)

    const formatted = activityRecords.activity.map((r: Record) => ({
      time: moment(r.timestamp).format("HH:mm"),
      hr: r.hr,
    }))

    setActivityRecords(formatted)
    setActivity(activity)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Fragment>
      {activity ? (
        <Card>
          <CardHeader
            title={`${activity.name} - ${moment(activity.start_time).format(
              "DD/MM/YYYY"
            )}`}
          />
          <ResponsiveContainer
            width="80%"
            height={600}
            style={{ margin: "auto" }}
          >
            <LineChart data={activityRecords}>
              <CartesianGrid stroke="#ccc" />
              <XAxis
                dataKey="time"
                label={{
                  value: "Time",
                  position: "insideBottomRight",
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: "Heart Rate (bpm)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hr" stroke="#8884d8" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      ) : null}
    </Fragment>
  )
}
