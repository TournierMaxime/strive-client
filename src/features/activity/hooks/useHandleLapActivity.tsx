import { useState } from "react"
import { activityService } from "../services/activity"
import { Lap, Laps } from "../types/activity"

const useHandleLapActivity = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedLap, setSelectedLap] = useState<number | null>(null)

  const handleOpen = (lap: number) => {
    setSelectedLap(lap)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setSelectedLap(null)
  }

  const handleConfirmDelete = async (
    id: string,
    setLapsActivity: React.Dispatch<React.SetStateAction<Laps | undefined>>
  ) => {
    if (!id || !selectedLap) return
    // Appel API pour supprimer ce lap précis
    await activityService.deleteActivityLap(id, selectedLap.toString())

    // Optimistic update local
    setLapsActivity((prev) =>
      prev
        ? {
            ...prev,
            activity: prev.activity.filter((a: Lap) => a.lap !== selectedLap),
          }
        : prev
    )

    handleClose()
  }
  return { handleConfirmDelete, handleClose, handleOpen, open, selectedLap }
}

export default useHandleLapActivity
