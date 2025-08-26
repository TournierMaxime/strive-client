import { TablePagination } from "@mui/material"

type Props = {
  count: number
  page: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  fetchData: (opts?: { offset?: number; limit?: number }) => Promise<void>
}

export default function ActivityPagination({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  fetchData,
}: Props) {
  return (
    <TablePagination
      style={{ display: "flex", justifyContent: "center" }}
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={(_, newPage) => {
        const nextOffset = newPage * rowsPerPage
        fetchData({ offset: nextOffset, limit: rowsPerPage })
      }}
      onRowsPerPageChange={(e) => {
        const newLimit = parseInt(e.target.value, 10)
        fetchData({ offset: 0, limit: newLimit }) // reset à la première page
      }}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  )
}
