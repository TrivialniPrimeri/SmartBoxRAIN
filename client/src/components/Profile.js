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
import Typography from "@mui/material/Typography";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  IconButton,
  Tooltip,
  Grid,
  Button,
  TextField,
  CardActionArea,
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
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
    imgPath: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...data, [name]: value }); //vzame staro vrednost in updata samo novo
  };

  useEffect(function () {
    axios
      .get("/users/" + userContext.user.id)
      .then((resp) => {
        setFormData(resp.data);
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("/users/" + userContext.user.id, formData)
      .then((resp) => {
        setError("");
        console.log("Uspesno posodobljen profil");
        setOpen(false);
        setData(resp.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
      
    if (file !== "") {
      const imageForm = new FormData();
      imageForm.append("image", file);
      axios
        .put("/users/profilephoto/" + userContext.user.id, imageForm)
        .then((resp) => {
          setError("");
          console.log("Uspesno posodobljeno");
          setData(resp.data);
        })
        .catch((err) => {
          setError(err.response.data.message);
        });
    }
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
              image={"http://localhost:81/" + data.imgPath}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {data.name}'s profile
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Full name: {data.name} {data.surname}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Email: {data.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Address: {data.address}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Phone number: {data.phone}
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
          <h2 id="parent-modal-title">Edit your profile</h2>
          <Grid item xs={12} sm={6} mt={2}>
            <TextField
              autoFocus
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="name"
              value={formData.name}
              autoComplete="given-name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={2}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="surname"
              value={formData.surname}
              autoComplete="family-name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={2}>
            <TextField
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              value={formData.phone}
              autoComplete="phone"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} mt={2} mb={1}>
            <TextField
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={formData.address}
              autoComplete="address"
              onChange={handleChange}
            />
          </Grid>
          <form className="form-group" name="image">
            <label>Change profile image</label>
            <input
              type="file"
              id="file"
              name="image "
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </form>
          <Button
            type="submit"
            name="submit"
            sx={{ marginRight: 2, marginTop: 2 }}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Profile;
