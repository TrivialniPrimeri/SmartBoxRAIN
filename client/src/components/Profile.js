import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import axios from "../axios";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InventoryIcon from "@mui/icons-material/Inventory";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {
  Badge,
  IconButton,
  makeStyles,
  tableCellClasses,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function Profile() {
  const userContext = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(data);
    setData({ ...data, [name]: value }); //vzame staro vrednost in updata samo novo
  };
  useEffect(function () {
    console.log(userContext.user);
    axios
      .get("/users/" + userContext.user.id)
      .then((resp) => {
        console.log(resp.data);
        setProfile(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('/users/'+userContext.user.id, data).then((resp) => {
        setError("");
        console.log("Uspesno posodobljeno");
        setOpen(false);
        setProfile(resp.data);
    }).catch((err) => {
        setError(err.response.data.message);
    });
};

  return (
    <>
      <Container>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card>
            <CardMedia
              component="img"
              alt="profile picture"
              height="140"
              image="https://cdn.pixabay.com/photo/2020/01/09/01/00/eyes-4751572_960_720.png"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {profile.name}'s profile
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Full name: {profile.name} {profile.surname}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Email: {profile.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Address: {profile.address}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Phone number: {profile.phone}
              </Typography>
              <CardActions>
                <Tooltip title="My boxes">
                  <IconButton aria-label="My boxes">
                    <InventoryIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit profile">
                  <IconButton aria-label="Edit profile" onClick={handleOpen}>
                    <EditIcon color="primary.dark" />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Urejanje</h2>
          <p id="parent-modal-description">Tukaj lahko uredite svoj profil</p>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              //value={profile.name}
              autoComplete="given-name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={1}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              //value={profile.surname}
              autoComplete="family-name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={1}>
            <TextField
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              //value={profile.phone}
              autoComplete="phone"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} mt={1}>
            <TextField
              fullWidth
              id="address"
              label="Address"
              name="address"
              //value={profile.address}
              autoComplete="address"
              onChange={handleChange}
            />
          </Grid>
          <Button onClick={handleSubmit}>Confirm</Button>
        </Box>
      </Modal>
    </>
  );
}

export default Profile;
