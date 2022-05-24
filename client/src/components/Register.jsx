import { useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { InputLabel, Typography, Container, Grid, Box, TextField, Button} from '@mui/material';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const [error, setError] = useState("");
    const [data, setData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		address: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});
    const navigator = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if(data.password !== data.passwordConfirm) {
            setError("Passwords do not match!");
            return;
        }
        axios.post('/auth/register', data).then((resp) => {
            setError("")
            navigator('/login');
        }).catch((err) => {
            setError(err.response.data.message);
        });
    };

    const handleChange = (event) => {
		const {name, value} = event.target;
		setData({...data, [name]: value}); //vzame staro vrednost in updata samo novo
	}

    return (
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <PersonAddIcon  sx={{fontSize:46, color:'primary.main'}}/>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="phone"
                                    name="phone"
                                    fullWidth
                                    id="phone"
                                    label="Phone"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Confirm Password"
                                    type="password"
                                    id="passwordConfirm"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Box textAlign='center' >
                            <Button variant='contained'
                                    type="submit"
                                    sx={{ mt: 2, mb: 1, borderRadius: 28,width:'100%',fontSize:16}}>
                                Sign up
                            </Button>
                        </Box>
                        <InputLabel color={'warning'}>{error}</InputLabel>
                    </Box>
                </Box>
            </Container>
    );
}