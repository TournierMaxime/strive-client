import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts"
import { useParams } from "react-router-dom"
import { useEffect, useState, Fragment } from "react"
import { striveApi } from "../services/strive"
import moment from "moment"

interface Activity {
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
  const [data, setData] = useState<Activity[]>([])

  const fetchData = async () => {
    if (!id) return
    const response = await striveApi.getActivityRecords(id)

    const formatted = response.activity.map((r: Activity) => ({
      time: moment(r.timestamp).format("HH:mm"),
      hr: r.hr,
    }))

    setData(formatted)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Fragment>
      <h2>Activity {id}</h2>
      <LineChart width={1280} height={600} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="time"
          label={{ value: "Time", position: "insideBottomRight", offset: -5 }}
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
    </Fragment>
  )
}
