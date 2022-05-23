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
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../userContext";
import axios from "../axios";


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

function BoxViewTable() {
    const [boxes, setBoxes] = useState([]);

    useEffect(function () {
        axios
            .get("/box/")
            .then((resp) => {
                console.log(resp.data);
                setBoxes(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                                    <Grid item lg={1}>
                                       <Typography fontWeight="bold">
                                           ID:
                                       </Typography>
                                    </Grid>
                                    <Grid item lg={10}>
                                        <Typography>
                                        {box._id}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </TableCell>
                            <StyledTableCell align="left">
                                <IconButton aria-label="location">
                                    <LocationOnIcon/>
                                </IconButton>
                                {box.location[0]} {box.location[1]}
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
export default BoxViewTable;