import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Fab, IconButton, tableCellClasses, Tooltip } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ViewIcon from '@mui/icons-material/Visibility';
import AuthorizedIcon from '@mui/icons-material/GppGood';
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import axios from "../axios";
import {Link} from "react-router-dom";
import AddBoxModal from './AddBoxModal';
import EditIcon from '@mui/icons-material/Edit';

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
    },
    '&:nth-of-type(even)': {
        borderRadius: 15,
    }
}));


function UserBoxViewTable() {
    const [boxes, setBoxes] = useState([]);
    const [authorizedBoxes, setAuthorizedBoxes] = useState([]);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("insert");
    const [editingBoxData, setEditingBoxData] = useState(null);

    useEffect(function () {
        axios
            .get("/users/myboxes")
            .then((resp) => {
                setBoxes(resp.data.boxes);
                setAuthorizedBoxes(resp.data.authorizedBoxes);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [open]);

    return (
        <>
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
                        {boxes.map((box) => (
                            <TableRow
                                key={box._id}
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
                                                {`${box.nickname} (${box.boxId})`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <StyledTableCell align="left">
                                    <IconButton aria-label="location">
                                        <LocationOnIcon/>
                                    </IconButton>
                                    {box.locationAddress}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Tooltip title="View">
                                        <Link to={{
                                            pathname: `/box/${box._id}`,
                                        }} >
                                            <IconButton aria-label="view">
                                                <ViewIcon/>
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Tooltip title="Edit">
                                            <IconButton aria-label="view" onClick={() => {setOpen(true);setType("edit");setEditingBoxData(box);}}>
                                                <EditIcon/>
                                            </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            {authorizedBoxes && 
                <StyledTableContainer component={Paper} sx={{mt: 5}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="left"><AuthorizedIcon/> Authorized Mailboxes</StyledTableCell>
                            <StyledTableCell />
                            <StyledTableCell />
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {authorizedBoxes.map((box) => (
                            <TableRow
                                key={box._id}
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
                                                {`${box.nickname} (${box.boxId})`}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <StyledTableCell align="left">
                                    <IconButton aria-label="location">
                                        <LocationOnIcon/>
                                    </IconButton>
                                    {box.locationAddress}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Tooltip title="View">
                                        <Link to={{
                                            pathname: `/box/${box._id}`,
                                        }} >
                                            <IconButton aria-label="view">
                                                <ViewIcon/>
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            }

            <Fab color="primary" style={{position: 'absolute', bottom: 0, right: 0, margin: '1%'}} onClick={() => {setOpen(true);setType("insert");}}>
            <AddIcon/>
            </Fab>
            <AddBoxModal open={open} setOpen={setOpen} type={type} box={editingBoxData}/>
        </>

    );
}
export default UserBoxViewTable;