import Button from "./Button";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import { AppBar, Drawer, IconButton, List, ListItem, ListItemButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useState } from "react";



function Header(props){

    const [drawerState, setDrawerState] = useState(false); 

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
            <Drawer open={drawerState} variant="persistent" onClose={() => setDrawerState(false)}>
                <List>
                    <ListItemButton>
                        <Link to="/">Home</Link>
                    </ListItemButton>
                    <ListItemButton>
                        <Link to="/login">Login</Link>
                    </ListItemButton>
                    <ListItemButton>
                        <Link to="/register">Register</Link>
                    </ListItemButton>
                </List>
            </Drawer>
        </header>

    )
}

export default Header;