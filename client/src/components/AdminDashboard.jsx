import BoxViewTable from "./BoxViewTable";
import UserViewTable from "./UserViewTable";
import Grid from "@mui/material/Grid";

function AdminDashboard() {
    return(
        <Grid container spacing={2} >
            <Grid item sx={{flexGrow:1}}>
                <UserViewTable/>
            </Grid>
            <Grid item  sx={{flexGrow:1}}>
                <BoxViewTable/>
            </Grid>
        </Grid>
    )
}
export default AdminDashboard;