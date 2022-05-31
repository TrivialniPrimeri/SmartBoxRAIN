import { styled } from '@mui/material/styles';
import InventoryIcon from '@mui/icons-material/Inventory';
import DisableIcon from '@mui/icons-material/Cancel';
import EnableIcon from '@mui/icons-material/Check';
import ViewIcon from '@mui/icons-material/Visibility'
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../axios";
import OwnerIcon from "@mui/icons-material/ContactPage";
import {tooltipClasses} from "@mui/material/Tooltip";
import { Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton, tableCellClasses, Tooltip, Paper, Grid } from "@mui/material";

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


function BoxViewTable() {
    const [boxes, setBoxes] = useState([]);
    const [needsUpdate, setNeedsUpdate] = useState(true);

    const updateProp = (state, boxId, propName) => {

        let props = {};
        props[propName] = state;

        axios.put('/box/' + boxId, props)
        .then(response => {
            setNeedsUpdate(true);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(function () {
        if(needsUpdate){
            axios
                .get("/box/")
                .then((resp) => {
                    setBoxes(resp.data);
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
                                    <Grid item lg={10} sx={{ml:2}}>
                                        <Typography>
                                        {box.nickname}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Grid container>
                                    <Grid item>
                                    <HtmlTooltip
                                        title={
                                            <>
                                                <Typography  color="inherit" sx={{mb:1}}>Details:</Typography>
                                                <p>ID: {box.owner?._id}</p>
                                                <p>Email: {box.owner?.email}</p>
                                                <p>Mobile: {box.owner?.phone}</p>
                                            </>
                                        }
                                        placement="right"
                                    >
                                        <IconButton aria-label="owner" >
                                            <OwnerIcon/>
                                        </IconButton>
                                    </HtmlTooltip>
                                        <span>{box.owner?.name}</span>
                                        <span>&nbsp;</span>
                                        <span>{box.owner?.surname}</span>
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
                            <StyledTableCell align="right">
                            {box.active ? (
                                <Tooltip title="Disable">
                                    <IconButton aria-label="disable" onClick={() => updateProp(false, box._id, "active")}>
                                        <DisableIcon color="error"/>
                                    </IconButton>
                                </Tooltip>
                            ) : (
                            <Tooltip title="Enable">
                                <IconButton aria-label="enable" onClick={() => updateProp(true, box._id, "active")}>
                                    <EnableIcon color="success"/>
                                </IconButton>
                            </Tooltip>
                            )}
                            

                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}
export default BoxViewTable;