import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Card,
} from "@mui/material"
import { trainWithCardiacFrequency } from "../../../utils/TrainWithCardiacFrequency"

export default function BasicStats() {
  return (
    <Card raised sx={{ marginTop: "1em", marginBottom: "1em" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FC Repos</TableCell>
              <TableCell>FC Réserve</TableCell>
              <TableCell>FC Max</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{trainWithCardiacFrequency.FCR} bpm</TableCell>
              <TableCell>{trainWithCardiacFrequency.getFCR()}</TableCell>
              <TableCell>{trainWithCardiacFrequency.FCM}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
