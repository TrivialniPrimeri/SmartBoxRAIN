import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Badge, IconButton, makeStyles, tableCellClasses, Tooltip} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/FindInPage';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Link} from "react-router-dom";


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
    createData('c9cf8b50-841c-44a9-b44d-6b582185d77f\n'),
    createData('7ccc97a0-748c-4a38-83ae-c12dba47bbfd\n'),
    createData('ed8bcb5f-3982-4856-88c8-9aca9d996dd5'),
];


function BasicTable() {    

    return (
        <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="left">Mailboxes</StyledTableCell>
                        <StyledTableCell align="center"/>
                        <StyledTableCell align="center"/>
                        <StyledTableCell align="center"/>
                        <StyledTableCell align="center"/>
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
                                        <InventoryIcon alt={row.name}/>
                                    </Grid>
                                    <Grid item lg={1}>
                                       <Typography fontWeight="bold">
                                           ID:
                                       </Typography>
                                    </Grid>
                                    <Grid item lg={10}>
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
                                <Tooltip title="View">
                                <IconButton aria-label="view">
                                <ViewIcon/>
                            </IconButton>
                                </Tooltip>
                                <Link to={{
                                    pathname: `/box/6289497e828241606f611307`,
                                }} >ZAKA</Link>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Tooltip title="Edit">
                                <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                                </Tooltip>
                            </StyledTableCell>

                            <StyledTableCell align="left">
                                <Tooltip title="Delete">
                                <IconButton aria-label="delete">
                                    <DeleteIcon color="error"/>
                            </IconButton>
                                </Tooltip>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}
export default BasicTable;