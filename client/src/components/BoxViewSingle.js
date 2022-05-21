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
import AuthorizedIcon from '@mui/icons-material/GppGood';
import OwnerIcon from '@mui/icons-material/ContactPage';
import Tooltip from '@mui/material/Tooltip';



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


function BoxViewSingle() {

    return (
        <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="left">Mailbox </StyledTableCell>
                        <StyledTableCell />
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Typography fontWeight="bold">
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Typography sx={{m:1}}>
                                    338f4cba-655f-43d2-b9ff-eeceb93f0f88
                                </Typography>
                            </TableCell>
                        </TableRow>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Typography fontWeight="bold">
                                Owner
                            </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Tooltip title="6283e401da58ff81c0e5ab3f">

                            <IconButton aria-label="owner" >
                                <OwnerIcon/>
                            </IconButton>
                            </Tooltip>
                        Matic Sulc
                        </TableCell>
                    </TableRow>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Typography fontWeight="bold">
                               Location
                            </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <IconButton aria-label="location"  sx={{
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "transparent"
                                }
                            }}>
                                <LocationOnIcon/>
                            </IconButton>
                            Ulica proleterskih brigad 12
                        </TableCell>
                    </TableRow>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Typography fontWeight="bold">
                                Authorized
                            </Typography>
                        </TableCell>
                        <TableCell component="tr" scope="row">
                            <IconButton aria-label="location"  sx={{
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "transparent"
                                }
                            }}> <AuthorizedIcon/> </IconButton>
                            Andrej, Martin, Tona
                        </TableCell>
                    </TableRow>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Typography fontWeight="bold">
                                Dimensions
                            </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Typography sx={{m:1}}>
                                50cm x 40cm x 30cm
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}
export default BoxViewSingle;