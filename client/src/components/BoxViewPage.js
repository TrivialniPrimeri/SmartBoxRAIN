import UserBoxViewTable from "./UserBoxViewTable";
import BoxViewTable from "./BoxViewTable";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useContext} from "react";
import {UserContext} from "../userContext";
import {useEffect} from "react";
import axios from "../axios";

function BoxViewPage(props){
    const userContext = useContext(UserContext);
    console.log(userContext.user)
    return(
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                {props.admin ? <BoxViewTable/> : <UserBoxViewTable/> }

            </Box>
        </Container>
    )
}
export default BoxViewPage;