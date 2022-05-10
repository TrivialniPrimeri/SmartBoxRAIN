import * as React from 'react';
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



const theme = createTheme();

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

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
                        />
                        <Box textAlign='center' >
                            <Button variant='contained'
                                    type="submit"
                                    sx={{ mt: 2, mb: 1, borderRadius: 28,width:'100%',fontSize:16}}>
                                Login
                            </Button>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs/>
                            <Grid item xs={6}>
                                <MutedLink href="#">
                                    Don't have an account?{" "}
                                    <BoldLink href="#" onClick="">
                                        Signup
                                    </BoldLink>
                                </MutedLink>
                            </Grid>
                            <Grid item xs/>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}