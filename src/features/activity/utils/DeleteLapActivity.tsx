import { Button, Modal, Box, Typography, Stack } from "@mui/material"
import { Laps } from "../types/activity"

export default function DeleteLapActivity({
  id,
  setLapsActivity,
  handleConfirmDelete,
  handleClose,
  open,
  selectedLap,
}: {
  id: string
  setLapsActivity: React.Dispatch<React.SetStateAction<Laps | undefined>>
  handleConfirmDelete: (
    id: string,
    setLapsActivity: React.Dispatch<React.SetStateAction<Laps | undefined>>
  ) => Promise<void>
  handleClose: () => void
  open: boolean
  selectedLap: number | null
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Supprimer le lap {selectedLap} ?
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Cette action est irréversible.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleConfirmDelete(id, setLapsActivity)}
          >
            Supprimer
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
