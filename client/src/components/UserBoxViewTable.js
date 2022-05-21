import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Badge, IconButton, makeStyles, tableCellClasses} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/FindInPage';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const StyledTableContainer= styled(TableContainer)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        borderRadius: 15,
    }
}));

function createData(name) {
    return { name };
}

const rows = [
    createData('338f4cba-655f-43d2-b9ff-eeceb93f0f88'),
    createData('0dcf7721-6369-41c3-8b0c-f972c371bb0b\n'),
    createData('000000-841c-0000-b44d-0000000\n'),

];


function UserBoxViewTable() {

    return (
        <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="left">My Mailboxes</StyledTableCell>
                        <StyledTableCell />
                        <StyledTableCell />
                        <StyledTableCell />
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Grid container>
                                    <Grid item lg={1}>
                                        <InventoryIcon/>
                                    </Grid>
                                    <Grid item>
                                    </Grid>
                                    <Grid item lg={7}>
                                        <Typography>
                                            {row.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <StyledTableCell align="left">
                                <IconButton aria-label="location">
                                    <LocationOnIcon/>
                                </IconButton>
                                Cesta proleterskih brigad 12
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <IconButton aria-label="delete">
                                    <ViewIcon/>
                                </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}
export default UserBoxViewTable;