import { Breadcrumbs, Card, CardContent, Link } from "@mui/material"

type Props = {
  key: number
  path: string
  name: string
}

export default function BreadCrumb({ items }: { items: Props[] }) {
  return (
    <Card raised sx={{ marginTop: "1em" }}>
      <CardContent>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {items.map((item: Props) => {
            return (
              <Link
                key={item.key}
                underline="hover"
                color="inherit"
                href={item.path}
              >
                {item.name}
              </Link>
            )
          })}
        </Breadcrumbs>
      </CardContent>
    </Card>
  )
}
