import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import axios from '../axios';

function Profile(){
    const userContext = useContext(UserContext); 
    const [profile, setProfile] = useState({});

    useEffect(function(){
        axios.get("/users/"+userContext.user.id).then((resp) => {
            console.log(resp.data);
            setProfile(resp.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <>
            <Container>
                <h1>{profile.name}'s Profile</h1>
                <h2>Name: {profile.name}</h2>
                <h2>Surname: {profile.surname}</h2>
                <h2>Email: {profile.email}</h2>
                <h2>Address: {profile.address}</h2>
                <h2>Phone number: {profile.phone}</h2>
            </Container>
        </>
    );
}

export default Profile;