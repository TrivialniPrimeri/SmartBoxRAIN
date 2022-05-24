import {useCallback, useContext, useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Badge, IconButton, makeStyles, tableCellClasses} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AuthorizedIcon from '@mui/icons-material/GppGood';
import OwnerIcon from '@mui/icons-material/ContactPage';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { UserContext } from "../userContext";
import axios from "../axios";
import {useParams} from "react-router-dom";
import TagifyWithTemplates from "./TagifyWithTemplates";
import MapBox from "./MapBox";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";


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
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #fffff1',
    },
}));

function BoxViewSingle() {
    const userContext = useContext(UserContext);
    const [box, setBox] = useState({});
    const [users, setUsers] = useState(null);
    const { id } = useParams()

    useEffect(function () {
        axios
            .get("/box/" + id)
            .then((resp) => {
                console.log(resp.data);
                setBox(resp.data);

                axios
                .get("/users")
                .then((resp) => {
                    console.log(resp.data);
                    setUsers(resp.data);
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (
        <Container>
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
        <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <colgroup>
                    <col width="25%"/>
                    <col width="80%"/>
                </colgroup>
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
                                    {box._id}
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
                        {userContext.user.admin ? (
                            <HtmlTooltip
                            title={
                                <>
                                    <Typography  color="inherit" sx={{mb:1}}>Details:</Typography>
                                         <p> {box.owner?.email}</p>
                                         <p> {box.owner?.phone}</p>
                                         <p> {box.owner?._id}</p>
                                </>
                            }
                            placement="right"
                        >
                            <IconButton aria-label="owner" >
                                <OwnerIcon/>
                            </IconButton>
                        </HtmlTooltip>
                        ) : (
                            <IconButton aria-label="owner" >
                                <OwnerIcon/>
                            </IconButton>
                        )}

                            <span>{box.owner?.name}</span>
                            <span>&nbsp;</span>
                            <span>{box.owner?.surname}</span>
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
                                {box.dimension ? box.dimension + "cm" : "/"} 
                            </Typography>
                        </TableCell>
                    </TableRow>
                    {box.owner?._id === userContext.user.id ? (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    <Typography fontWeight="bold">
                                        Authorized
                                    </Typography>
                                </TableCell>
                                <TableCell component="tr" scope="row">
                                <Grid container >
                                    <Grid item>
                                        <IconButton aria-label="location"  sx={{
                                            "&.MuiButtonBase-root:hover": {
                                                bgcolor: "transparent"
                                            }
                                        }}> <AuthorizedIcon/> </IconButton>
                                    </Grid>
                                    <Grid item lg>
                                        {users && box.authorizedUsers && <TagifyWithTemplates authorizedUsers={box.authorizedUsers} users={users}  />}
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ) : null}
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
                            {box.location ?  box.location[0]:""} {box.location ? box.location[1]:""}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <Container sx={{display: 'flex' , m:2}}>
                            {box.location ? <MapBox coords={{lat: box.location[0], lng: box.location[1]}}/> : ""}
                        </Container>
                    </TableRow>
                </TableBody>
            </Table>

        </StyledTableContainer>
            </Box>
        </Container>
    );
}
export default BoxViewSingle;