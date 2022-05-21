import Button from "./Button";
import { UserContext } from "../userContext";
import { Link, NavLink } from "react-router-dom";
import { AppBar, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useState, useContext } from "react";


function Header(props){

    const [drawerState, setDrawerState] = useState(false); 

    const userCxt = useContext(UserContext);

    return(
        <header>
            <AppBar position="sticky" sx={{p: 2}}>
                <Stack direction="row" alignItems="center" gap="1">
                    <IconButton sx={{mr: 2}} color="inherit" onClick={() => setDrawerState(true)}>
                        <MenuIcon fontSize="large"></MenuIcon>
                    </IconButton>
                    <Typography variant="h4">Spletni portal</Typography>
                </Stack>
            </AppBar>
            <Drawer open={drawerState} onClose={() => setDrawerState(false)} className="navDrawer" >
                <List>
                    <ListItemButton component={NavLink} to="/">
                        <ListItemText primary="Home"/>
                    </ListItemButton>
                    {userCxt.user ? <>
                    <ListItemButton component={NavLink} to="/profile" >
                        <ListItemText primary="Profile"/>
                    </ListItemButton>
                        <ListItemButton component={NavLink} to="/logout" >
                            <ListItemText primary="Logout"/>
                        </ListItemButton>
                    </> : <>
                        <ListItemButton component={NavLink} to="/login">
                            <ListItemText primary="Login" />
                        </ListItemButton>
                        <ListItemButton component={NavLink} to="/register">
                            <ListItemText primary="Register" />
                        </ListItemButton>
                    </>}
                </List>
            </Drawer>
        </header>

    )
}

export default Header;