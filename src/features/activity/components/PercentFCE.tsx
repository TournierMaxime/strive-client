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

export default function PercentFCE() {
  function tableHeadTenToTen() {
    const cells = []
    for (let percent = 40; percent <= 100; percent += 10) {
      cells.push(<TableCell key={percent}>{percent} %</TableCell>)
    }
    return cells
  }

  function tableBodyTenToTen() {
    const cells = []
    for (let percent = 0.4; percent <= 1; percent += 0.1) {
      cells.push(
        <TableCell key={percent}>
          {trainWithCardiacFrequency.getFCE(percent) + " bpm"}
        </TableCell>
      )
    }
    return cells
  }

  return (
    <Card raised sx={{ marginTop: "1em", marginBottom: "1em" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Pourcentage de la Fréquence cardiaque d'entrainement
              </TableCell>
            </TableRow>
            <TableRow>{tableHeadTenToTen()}</TableRow>
          </TableHead>
          <TableBody>
            <TableRow>{tableBodyTenToTen()}</TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
