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

export default function TrainingZone() {
  const rows = Array.from({ length: 5 }, (_, i) => {
    const zone = i + 1
    const name = [
      "Récupération",
      "Aérobie",
      "Seuil aérobie",
      "Seuil anaérobie",
      "VO2 Max",
    ]
    const percentFCM = [0.6, 0.7, 0.8, 0.9, 1]
    const percentFCE = [0.6, 0.7, 0.8, 0.9, 1]
    return (
      <TableRow key={zone}>
        <TableCell>Zone {zone}</TableCell>
        <TableCell>{name[i]}</TableCell>
        <TableCell>
          {`${
            percentFCM[i] * 100
          }% (${trainWithCardiacFrequency.getFCMaxWithIntensity(
            percentFCM[i]
          )} bpm)`}
        </TableCell>
        <TableCell>{`${
          percentFCE[i] * 100
        }%  (${trainWithCardiacFrequency.getFCE(
          percentFCE[i]
        )} bpm)`}</TableCell>
      </TableRow>
    )
  })
  return (
    <Card raised sx={{ marginTop: "1em", marginBottom: "1em" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Zones</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>FC Max %</TableCell>
              <TableCell>FC Réserve %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
