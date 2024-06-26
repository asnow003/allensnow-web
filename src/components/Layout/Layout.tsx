import React, { useState } from "react";
import { Background } from "./Background";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Layout.scss";

import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import INavigationItem from "../../interfaces/INavigationItem";
import * as navigation from "../../assets/content/navigationItems.json";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ImageMap } from "../../assets/images/ImageMap";

const githubURL = "https://github.com/asnow003";
const linkedInURL = "https://www.linkedin.com/in/allensnow/";
const instagramURL = "https://www.instagram.com/allen.snow/";

const Layout = () => {
  const navItems = JSON.parse(JSON.stringify(navigation)) as INavigationItem[];

  const drawerWidth = 240;

  const background = new Background(navItems);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Box
          className="HeaderTitle"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <span>Allen&nbsp;Snow</span>
          <span>.com</span>
        </Box>
      </Typography>
      <Divider />
      <List>
        <ListItem key={0} disablePadding>
          <ListItemButton href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={0} disablePadding>
          <ListItemButton href={githubURL} target="_blank">
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={"GitHub"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={1} disablePadding>
          <ListItemButton href={linkedInURL} target="_blank">
            <ListItemIcon>
              <LinkedInIcon />
            </ListItemIcon>
            <ListItemText primary={"LinkedIn"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={2} disablePadding>
          <ListItemButton href={instagramURL} target="_blank">
            <ListItemIcon>
              <InstagramIcon />
            </ListItemIcon>
            <ListItemText primary={"Instagram"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  return (
    <Container>
      <div className="Layout">
        <CssBaseline />
        <AppBar component="nav" sx={{ background: "#fffef8" }}>
          <Toolbar>
            <IconButton
              color="default"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Avatar alt="Allen Snow" src={ImageMap["avatar"]} />{" "}
            </Box>
            <Typography
              variant="h6"
              align="left"
              alignItems={"center"}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Stack
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                direction="row"
                spacing={2}
              >
                <Box
                  className="HeaderTitle"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Link to="/">
                    <span>Allen&nbsp;Snow</span>
                    <span>.com</span>
                  </Link>
                </Box>
              </Stack>
            </Typography>

            <Box
              alignItems={"right"}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <IconButton href={githubURL} target="_blank">
                <GitHubIcon />
              </IconButton>
              <IconButton href={linkedInURL} target="_blank">
                <LinkedInIcon />
              </IconButton>
              <IconButton href={instagramURL} target="_blank">
                <InstagramIcon />
              </IconButton>

              {isAuthenticated ? (
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  {user?.name} - Log out
                </button>
              ) : (
                <button onClick={() => loginWithRedirect()}>Log in</button>
              )}
            </Box>
            <Box
              alignItems={"right"}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <Avatar alt="Allen Snow" src={ImageMap["avatar"]} />
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
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
        </Box>
        <div className="Content">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default Layout;
