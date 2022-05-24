import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Badge, IconButton, makeStyles, tableCellClasses, Tooltip} from "@mui/material";
import Grid from "@mui/material/Grid";
import InventoryIcon from '@mui/icons-material/Inventory';
import DisableIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/Visibility'
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "../axios";
import OwnerIcon from "@mui/icons-material/ContactPage";
import {tooltipClasses} from "@mui/material/Tooltip";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import {pink, red} from "@mui/material/colors";


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
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12)
    },
}));


function UserViewTable() {
    const [users, setUsers] = useState(null);

    useEffect(function () {
        axios
            .get("/users/")
            .then((resp) => {
                console.log(resp.data);
                setUsers(resp.data);
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
                        <StyledTableCell align="left">Users</StyledTableCell>
                        <StyledTableCell align="center"/>
                        <StyledTableCell align="center"/>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Grid container >
                                    <Grid item>
                                        <Tooltip title="Add admin privilege">
                                            <IconButton aria-label="admin">
                                                <GroupAddIcon sx={{ color: red[700], fontSize:25 }}/>
                                            </IconButton>
                                        </Tooltip>
                                        <HtmlTooltip
                                            title={
                                                <>
                                                    <Typography  color="inherit" sx={{mb:1}}>Details:</Typography>
                                                    <p>ID: {user?._id}</p>
                                                    <p>Email: {user?.email}</p>
                                                    <p>Mobile: {user?.phone}</p>
                                                </>
                                            }
                                            placement="right"
                                        >
                                            <IconButton aria-label="owner" >
                                                <OwnerIcon  sx={{ fontSize: 40}}/>
                                            </IconButton>
                                        </HtmlTooltip>
                                        <span>{user?.name}</span>
                                        <span>&nbsp;</span>
                                        <span>{user?.surname}</span>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <StyledTableCell component="th" scope="row" align="left">
                                <Grid container>
                                    <Grid item>
                                        <IconButton aria-label="box" >
                                            <Badge sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 15, minWidth: 15 } }} badgeContent={4} color="primary">
                                                <InventoryIcon sx={{ fontSize: 40}}/>
                                            </Badge>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Tooltip title="Disable">
                                    <IconButton aria-label="disable">
                                        <DisableIcon color="error"/>
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
export default UserViewTable;