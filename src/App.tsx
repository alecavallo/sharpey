import React, { ReactElement, ReactNode, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Dashboard from "./components/Dashboard/Dashboard";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@material-ui/core";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import MailIcon from "@material-ui/icons/Mail";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { AppContext } from "./AppContext";
import Divider from "@material-ui/core/Divider";
import FastfoodRoundedIcon from "@material-ui/icons/FastfoodRounded";
import TablaCarbohidratos from "./components/Carbohidratos/TablaCarbohidratos";
import Recetas from "./components/Recetas/Recetas";
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    SelectedMenu: {
      color: theme.palette.primary.main,
      "& svg": {
        color: theme.palette.primary.main,
      },
    },
  })
);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

function App(props: Props): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [title, setTitle] = useState("Bienvenidos");
  const [selectedMenu, setSelectedMenu] = useState(0);

  const values = {
    title,
    setTitle,
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelectMenu = (index: number, path: string) => {
    setSelectedMenu(index);
    return <Redirect to={`/${path}`} />;
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Carbohidratos", "Recetas"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              handleSelectMenu(index, text.toLowerCase());
            }}
            component="a"
            href={`/${text.toLowerCase()}`}
            className={
              selectedMenu === index ? classes.SelectedMenu : undefined
            }
          >
            <ListItemIcon>
              {(function (): ReactNode {
                switch (index) {
                  case 0:
                    return <TrendingUpRoundedIcon />;
                  case 1:
                    return <FastfoodRoundedIcon />;
                  default:
                    return <MailIcon />;
                }
              })()}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <TrendingUpRoundedIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <Container>
      <div className={classes.root}>
        <CssBaseline />
        <AppContext.Provider value={values}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Abrir menú"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="HdC">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Router>
              <Route exact path="/" component={Dashboard} />
              <Route
                exact
                path="/carbohidratos"
                component={TablaCarbohidratos}
              />
              <Route exact path="/recetas" component={Recetas} />
            </Router>
          </main>
        </AppContext.Provider>
      </div>
    </Container>
  );
}

export default App;
