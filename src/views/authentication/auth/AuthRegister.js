import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/Firebase'; 
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'; 

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [username, setUsername] = useState("");
    const [alert, setAlert] = useState(null);

    const registerUser = async () => {
        try {

            const { user } = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

            const userId = user.uid;
            const db = getFirestore();
            const usersCollection = collection(db, 'users');

            await setDoc(doc(usersCollection, userId), {
                username: username,
            });

            setAlert(<Alert variant="outlined" severity="success">Registered User Successfully!</Alert>);
        } catch (error) {
            setAlert(<Alert variant="outlined" severity="error">Error, Could Not Register User!</Alert>);
            console.log(error.message);
        }
    };

    return (
        <>
            {alert}
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='name' mb="5px">
                        Username
                    </Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth 
                        onChange={(event) => setUsername(event.target.value)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">
                        Email Address
                    </Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">
                        Password
                    </Typography>
                    <CustomTextField id="password" type="password" variant="outlined" fullWidth onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }} />
                </Stack>
                <Button color="primary" variant="contained" size="large" onClick={registerUser} fullWidth>
                    Sign Up
                </Button>
                {subtitle}

            </Box>
        </>
    );
};

export default AuthRegister;
