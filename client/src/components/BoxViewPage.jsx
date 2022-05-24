import UserBoxViewTable from "./UserBoxViewTable";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {useContext} from "react";
import {UserContext} from "../userContext";
import AdminDashboard from "./AdminDashboard";

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
                {props.admin ? <AdminDashboard/> : <UserBoxViewTable/> }

            </Box>
        </Container>
    )
}
export default BoxViewPage;