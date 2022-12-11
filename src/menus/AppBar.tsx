import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { forwardRef, useContext } from "react";
import { AppContext } from "../AppContext";

const ButtonAppBar = forwardRef((props, ref) => {
  const App = useContext(AppContext);
  return (
    <Box sx={{ flexGrow: 1 }} ref={ref}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {App.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

export default ButtonAppBar;
