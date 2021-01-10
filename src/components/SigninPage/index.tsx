import React, { useState } from 'react';
//MATERIAL-UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
//ROUTER-DOM
import { Link as Linked, useHistory } from 'react-router-dom';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark, changeDark } from '../../toolkit/darkSlice';
import { selectUser, matchUser } from '../../toolkit/userSlice';
//FORMIK
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
//YUP
import { object, string } from 'yup';
//SWEETALERT2
import { darkAlert, pageAlert } from '../../alerts';
//REACT-HELMET
import Head from '../../Head';

const process = (time: number) => new Promise(acc => setTimeout(acc, time));

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))

function SigninPage() {
    const classes = useStyles();

    const dark = useSelector(selectDark);
    const users = useSelector(selectUser);
    const dispatch = useDispatch();

    const [ visiblity, setVisiblity ] = useState<boolean>(false);

    const history = useHistory();

    if(users[users?.length-1] === []) {
        return <div> Loading. . . </div>
    }
    else {
        return (
            <>
                <Head title="SignIn"/>

                <Grid container component="main" className={classes.root}>
                    <CssBaseline/>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar} style={{ backgroundColor: dark ? "#5bc0de" : "#000000" }}>
                                <VpnKeyIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
        
        
        
                            <Formik
                                initialValues={{
                                    username: "ali",
                                    password: "ali123"
                                }}
                                validationSchema={
                                    object({
                                        username : string()
                                        .max(30, 'Must be atmost 30 character')
                                        .min(3, 'Must have atleast 3 characters')
                                        .required('Must fill username'),
        
                                        password: string()
                                        .max(10, 'Must be atmost than 10 characters')
                                        .min(6, 'Must be atleast than 6 characters')
                                        .required('Must fill password')
                                    })
                                }
                                onSubmit={async (values) => {
                                    dispatch(matchUser(values));       //sending as object to redux for only device not server's api
    
    
                                    pageAlert('Submitting...', 'top-end', 'info');
                                    await process(2500);
                                    history.push('/signingin');
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className={classes.form} autoComplete="off">
                                        
                                        <Box paddingBottom={1}>
                                            <Field fullWidth name='username' component={TextField} label="Username"
                                                color={dark ? "secondary" : "primary"}
                                                autoFocus
                                            />
                                        </Box>
        
                                        <Box paddingBottom={1} display="flex" alignItems="center">
                                            <Field fullWidth name='password' component={TextField} label="Password"
                                                color={dark ? "secondary" : "primary"}
                                                type={visiblity ? "text" : "password"}
                                            />
                                            { visiblity ? <VisibilityIcon fontSize="small" onClick={() => setVisiblity(false)}/> : <VisibilityOffIcon fontSize="small" onClick={() => setVisiblity(true)}/> }
                                        </Box>
        
                                        <Button 
                                            fullWidth
                                            type="submit"
                                            variant="contained"
                                            className={classes.submit}
                                            disabled={isSubmitting}
                                            startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null}
                                            color={dark ? "secondary" : "primary"}
                                        >
                                            Sign In
                                        </Button>
                                        
                                        <Grid container>
                                            <Grid item>
                                                <Linked to='/signup' style={{ color: dark ? "#5bc0de" : "#000000" }}>
                                                    Don't have an account? Sign Up
                                                </Linked>
                                            </Grid>
                                        </Grid>
        
                                        <Box mt={4}>
                                           <Typography variant="body2" color="textSecondary" align="center">
                                                {'Copyright © '}
                                                <Link color="inherit" href="https://www.writediary.com/">
                                                    Diary
                                                </Link>{' '}
                                                {new Date().getFullYear()}
                                                {'.'}
        
                                                <IconButton onClick={() => {
                                                    dispatch(changeDark());
                                                    darkAlert(dark);
                                                }}>
                                                    { dark ? <Brightness4Icon fontSize="small"/>: <Brightness7Icon fontSize="small"/> }
                                                </IconButton>
                                           </Typography>
                                        </Box>
        
                                    </Form>
                                )}
                            </Formik>
        
        
        
                        </div>
                    </Grid>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} id="image"/>
                </Grid>
            </>
        )
    }
}

export default SigninPage;