import { Button as Btn } from "@mui/material"
import { activityService } from "../services/activity"
import { useState } from "react"
import Alert from "@mui/material/Alert"
import { Downloading, Sync } from "@mui/icons-material"

type Props = {
  message: string | null
}

export default function Button({ title }: { title: string }) {
  const [data, setData] = useState<Props>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      const response = await activityService.updateActivities()
      setData(response)
    } catch (error: any) {
      console.error(error)
      setIsLoading(false)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
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

  if (error) {
    return <Alert severity="error">{error}</Alert>
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
