import Button from "./Button";
import { UserContext } from "../userContext";
import { Link, NavLink } from "react-router-dom";
import { AppBar, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useState, useContext } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import InventoryIcon from "@mui/icons-material/Inventory";

function Header(props){

    const [drawerState, setDrawerState] = useState(false); 

    const [theme, setTheme] = useState(localStorage.theme ? JSON.parse(localStorage.theme) : "light");
    const themeUpdate = (themeInfo) => {
        localStorage.setItem("theme", JSON.stringify(themeInfo));
        setTheme(themeInfo);
        window.dispatchEvent(new Event("themeUpdate"));
      }

    const userCxt = useContext(UserContext);

    return(
        <header>
            <AppBar position="sticky" sx={{p: 2}} >
                <Stack direction="row" alignItems="center" gap="1">
                    <IconButton sx={{mr: 2}} color="inherit" onClick={() => setDrawerState(true)}>
                        <MenuIcon fontSize="large"></MenuIcon>
                    </IconButton>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>Spletni portal</Typography>
                    {(theme === "light") ? <DarkModeIcon sx={{cursor: 'pointer'}} onClick={() => themeUpdate("dark")}/> : <LightModeIcon sx={{cursor: 'pointer'}} onClick={() => themeUpdate("light")}/>}
                </Stack>
            </AppBar>
            <Drawer open={drawerState} onClose={() => setDrawerState(false)} className="navDrawer" >
                <List>
                    <ListItemButton component={NavLink} to="/">
                        <InventoryIcon sx={{mr: 1}}/>
                        <ListItemText primary="My boxes"/>
                    </ListItemButton>
                    {userCxt.user?.admin && <ListItemButton component={NavLink} to="/admin">
                        <AdminPanelSettingsIcon sx={{mr: 1}}/>
                        <ListItemText primary="Admin"/>
                    </ListItemButton>}
                    {userCxt.user ? <>
                    <ListItemButton component={NavLink} to="/profile" >
                        <AccountCircleIcon sx={{mr: 1}}/>
                        <ListItemText primary="Profile"/>
                    </ListItemButton>
                        <ListItemButton component={NavLink} to="/logout" >
                            <LogoutIcon sx={{mr: 1}}/>
                            <ListItemText primary="Logout"/>
                        </ListItemButton>
                    </> : <>
                        <ListItemButton component={NavLink} to="/login">
                            <LoginIcon sx={{mr: 1}}/>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                        <ListItemButton component={NavLink} to="/register">
                            <PersonAddIcon sx={{mr: 1}}/>
                            <ListItemText primary="Register" />
                        </ListItemButton>
                    </>}
                </List>
            </Drawer>
        </header>

    )
}

export default Header;