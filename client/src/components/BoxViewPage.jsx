import UserBoxViewTable from "./UserBoxViewTable";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {useContext} from "react";
import {UserContext} from "../userContext";
import AdminDashboard from "./AdminDashboard";
import { useNavigate } from "react-router-dom";

function BoxViewPage(props){
    const userContext = useContext(UserContext);
    const navigator = useNavigate();

    if(!userContext.user) navigator("/login")

    return(
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                {props.admin ? <AdminDashboard/> : <UserBoxViewTable/> }

            </Box>
        </Container>
    )
}
export default BoxViewPage;