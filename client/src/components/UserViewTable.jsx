import { styled } from '@mui/material/styles';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useEffect, useState} from "react";
import axios from "../axios";
import OwnerIcon from "@mui/icons-material/ContactPage";
import {tooltipClasses} from "@mui/material/Tooltip";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { red, green } from "@mui/material/colors";
import LockClockIcon from '@mui/icons-material/LockClock';
import moment from "moment";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Badge, IconButton, tableCellClasses, Tooltip, Grid, Typography} from '@mui/material';

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
    const [needsUpdate, setNeedsUpdate] = useState(true);

    const updateProp = (state, userId, propName) => {

        let props = {};
        props[propName] = state;

        axios.put('/users/' + userId, props)
        .then(response => {
            setNeedsUpdate(true);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(function () {
        if(needsUpdate){
            axios
            .get("/users/all")
            .then((resp) => {
                setUsers(resp.data);
                setNeedsUpdate(false);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [needsUpdate]);

    return (
        <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="left">Users</StyledTableCell>
                        <StyledTableCell align="center"/>
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
                                    <Grid item xs={1}>
                                        {user.isAdmin &&
                                            <AdminPanelSettingsIcon  sx={{ fontSize: 20,color:red[700]}}/>
                                        }
                                    </Grid>
                                    <Grid item>
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
                                    <Tooltip title="Number of boxes">
                                        <IconButton aria-label="box" >
                                            <Badge sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 15, minWidth: 15 } }} badgeContent={user.boxCount} color="primary">
                                                <InventoryIcon sx={{ fontSize: 40}}/>
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row" align="center">
                                <Grid container>
                                    <Grid item>
                                        <LockClockIcon/>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{ml:1}}>
                                           <Typography fontWeight={"bold"}>Last unlock:</Typography>
                                           {moment(user.lastUnlock).format("DD.MM.YYYY HH:mm")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                            {user.isAdmin ? 
                                <Tooltip title="Remove admin privilege">
                                    <IconButton aria-label="admin" onClick={() => updateProp(false, user._id, "isAdmin")}>
                                        <GroupRemoveIcon sx={{ color: red[700], fontSize:25 }}/>
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title="Add admin privilege">
                                    <IconButton aria-label="admin" onClick={() => updateProp(true, user._id, "isAdmin")}>
                                        <GroupAddIcon sx={{ color: green[700], fontSize:25 }}/>
                                    </IconButton>
                                </Tooltip>
                            }
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}
export default UserViewTable;