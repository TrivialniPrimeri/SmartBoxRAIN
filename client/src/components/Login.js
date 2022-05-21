import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import {
    BoldLink,
    MutedLink
} from "./common"

import axios from '../axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputLabel } from '@mui/material';
import { UserContext } from '../userContext';
import jwt_decode from 'jwt-decode';


const theme = createTheme();

export default function SignIn() {

    const navigator = useNavigate();
    const userCxt = useContext(UserContext);

    const [error, setError] = useState("");
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/auth/login', data).then((resp) => {
            console.log(resp);
            let decoded = jwt_decode(resp.data.accessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${resp.data.accessToken}`;
            userCxt.setUserContext({email: decoded.email, id: decoded.id, admin: decoded.isAdmin});
            setError("");
            navigator('/');
        }).catch((err) => {
            console.log(err);
            setError(err.response.data.message);
        });
    };

    const handleChange = (event) => {
		const {name, value} = event.target;
		setData({...data, [name]: value}); //vzame staro vrednost in updata samo novo
	}


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <AccountCircleSharpIcon sx={{fontSize:46, color:'primary.main'}} />

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <Box textAlign='center' >
                            <Button variant='contained'
                                    type="submit"
                                    sx={{ mt: 2, mb: 1, borderRadius: 28,width:'100%',fontSize:16}}>
                                Login
                            </Button>
                        </Box>
                        <InputLabel color={'warning'}>{error}</InputLabel>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}