import { useContext, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Button, IconButton, tableCellClasses, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, Tooltip, tooltipClasses, Container, Box} from "@mui/material";
import AuthorizedIcon from '@mui/icons-material/GppGood';
import OwnerIcon from '@mui/icons-material/ContactPage';
import { UserContext } from "../userContext";
import axios from "../axios";
import {useParams} from "react-router-dom";
import TagifyWithTemplates from "./TagifyWithTemplates";
import MapBox from "./MapBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";
import LockOpenIcon from '@mui/icons-material/LockOpen';


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

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
    maxHeight: '70%',
    overflow: 'auto',
	transform: 'translate(-50%, -50%)',
	width: 800,
	bgcolor: 'background.paper',
	borderRadius: 4,
	boxShadow: 24,
	p: 4,
  };

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

function BoxViewSingle() {
    const userContext = useContext(UserContext);
    const [box, setBox] = useState({});
    const [users, setUsers] = useState(null);
    const { id } = useParams()
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get(`/box/${id}/unlocks`)
            .then(res => {
                setHistory(res.data);
            })
            .catch(err => console.log(err));
    }, [historyModalOpen]);
    

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
                                    <InventoryIcon/>
                                </Typography>
                            </TableCell>

                            <TableCell component="th" scope="row">
                                <Typography sx={{m:1}}>
                                    {`${box.nickname} (${box.boxId})`}
                                </Typography>
                            </TableCell>

                        </TableRow>
                    {userContext.user?.admin && <TableRow>
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
                    </TableRow>}
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
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Typography fontWeight="bold">
                                Closest address
                            </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Typography sx={{m:1}}>
                                {box?.locationAddress} 
                            </Typography>
                        </TableCell>
                    </TableRow>
                    {box.owner?._id === userContext.user.id || userContext.user.admin ? (
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
                                        {users && box.authorizedUsers && <TagifyWithTemplates authorizedUsers={box.authorizedUsers} owner={box.owner} users={users}  />}
                                    </Grid>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ) : null}
                    {box.latestUnlock ? (
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Typography fontWeight="bold">
                                Latest unlock
                            </Typography>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <IconButton aria-label="location"  sx={{
                                "&.MuiButtonBase-root:hover": {
                                    bgcolor: "transparent"
                                }
                            }}>
                                <LockOpenIcon/>
                            </IconButton>
                                {moment(box.latestUnlock.createdAt).format("DD.MM.YYYY HH:mm") + " by " + box.latestUnlock.userId.name + " " + box.latestUnlock.userId.surname}
                                {userContext.user.id === box.owner._id && <Button variant="contained" color="primary" sx={{ml: 2}} onClick={(e) => {setHistoryModalOpen(true)}}>View all</Button>}
                        </TableCell>
                    </TableRow>
                    ) : (
                        ""
                    )}
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Container sx={{display: 'flex' , m:2}}>
                                {box.location ? <MapBox coords={{lat: box.location[0], lng: box.location[1]}}/> : ""}
                            </Container>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </StyledTableContainer>
            </Box>
            <Modal open={historyModalOpen} onClose={() => setHistoryModalOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" gutterBottom align="center">
                        Unlock History
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>sendStatus</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history && history.map((unlock) => (
                                    <TableRow key={unlock._id}>
                                        <TableCell component="th" scope="row">
                                            {moment(unlock.createdAt).format("DD.MM.YYYY HH:mm")}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {unlock.userId.name + " " + unlock.userId.surname}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {unlock.success ? "Success" : "Failed"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>  
                </Box>
            </Modal>
        </Container>
    );
}
export default BoxViewSingle;