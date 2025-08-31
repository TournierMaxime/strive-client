import { Button as Btn } from "@mui/material"
import { activityService } from "../services/activity"
import { useState } from "react"
import Alert from "@mui/material/Alert"
import { Downloading, Sync } from "@mui/icons-material"

type Props = {
  message?: string | null
  isLoading: boolean
  error?: {
    message?: string
  }
}

export default function Button({ title }: { title: string }) {
  const [data, setData] = useState<Props>()

  const handleUpdate = async () => {
    try {
      setData({
        isLoading: true,
      })
      const response = await activityService.updateActivities()
      setData({
        message: response.message,
        isLoading: false,
      })

      await activityService.getActivities()
    } catch (error: any) {
      console.error(error)
      setData({
        isLoading: false,
        error: error.message,
      })
    } finally {
      setData({
        isLoading: false,
      })
    }
  }

  if (data && data?.isLoading) {
    return (
      <Btn
        startIcon={<Downloading />}
        sx={{ margin: "1em" }}
        variant="outlined"
        onClick={handleUpdate}
      >
        Loading
      </Btn>
    )
  }

  if (data && data.message) {
    return <Alert severity="success">{data.message}</Alert>
  }

  if (data && data.error) {
    return <Alert severity="error">{data.error.message}</Alert>
  }

  return (
    <Btn
      endIcon={<Sync />}
      sx={{ margin: "1em" }}
      variant="outlined"
      onClick={handleUpdate}
    >
      {title}
    </Btn>
  )
}
