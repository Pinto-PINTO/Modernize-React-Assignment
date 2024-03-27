import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import Alert from '@mui/material/Alert';

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/Firebase';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [alert, setAlert] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const loginUser = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            setLoggedIn(true);
        } catch (error) {
            setAlert(<Alert variant="outlined" severity="error">Invalid Login Credentials!</Alert>);
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (loggedIn) {
            window.location.href = '/dashboard';
        }
    }, [loggedIn]);

    return (
        <>
            {alert}
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Stack>
                <Box>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px">Email</Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }} />
                </Box>
                <Box mt="25px">
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                    <CustomTextField id="password" type="password" variant="outlined" fullWidth onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }} />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                </Stack>
            </Stack>
            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    onClick={loginUser}
                >
                    Sign In
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthLogin;
