import UserBoxViewTable from "./UserBoxViewTable";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BoxViewTable from "./BoxViewTable";
import BoxViewSingle from "./BoxViewSingle";

function BoxViewPage(){

    return(
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
            <BoxViewTable/>
            </Box>
        </Container>
    )
}
export default BoxViewPage;