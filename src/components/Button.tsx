import { Button as Btn } from "@mui/material"
import { striveApi } from "../services/strive"
import { Fragment, useState } from "react"
import Alert from "@mui/material/Alert"

type Props = {
  message: string | null
}

export default function Button({ title }: { title: string }) {
  const [data, setData] = useState<Props>()
  const handleUpdate = async () => {
    const response = await striveApi.updateActivities()
    setData(response)
  }

  return (
    <Fragment>
      {data && data.message ? (
        <Alert severity="success">{data.message}</Alert>
      ) : (
        <Btn
          sx={{ marginTop: "1em" }}
          variant="outlined"
          onClick={handleUpdate}
        >
          {title}
        </Btn>
      )}
    </Fragment>
  )
}
