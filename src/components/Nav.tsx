import { Fragment, useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  Divider,
} from "@mui/material"
import { APP_NAME } from "../constants"
import { Link } from "react-router-dom"

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const drawerWidth = 240

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {APP_NAME}
      </Typography>
      <Divider />
    </Box>
  )

  return (
    <Fragment>
      <AppBar component="nav">
        <Toolbar>
          <Link
            style={{ textDecoration: "none", color: "#fff", cursor: "pointer" }}
            to={"/"}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              {APP_NAME}
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <nav style={{ marginBottom: "4em" }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Fragment>
  )
}
