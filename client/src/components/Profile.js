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
import {Badge, IconButton, makeStyles, tableCellClasses, Tooltip,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Profile() {
  const userContext = useContext(UserContext);
  const [profile, setProfile] = useState({});

  useEffect(function () {
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
          <Card sx={{ maxWidth: 400 }}>
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
                  <IconButton aria-label="Edit profile">
                    <EditIcon color="primary.dark" />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default Profile;
