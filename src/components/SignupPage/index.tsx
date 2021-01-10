import React, { useState } from 'react';
//MATERIAL-UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TelegramIcon from '@material-ui/icons/Telegram';
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
import { selectUser } from '../../toolkit/userSlice';
//FORMIK
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
//YUP
import { object, string, boolean, ref } from 'yup';
//SWEETALERT2
import { darkAlert, signupAlert, pageAlert } from '../../alerts';
//FOR NEW USER
import { postUser } from '../../api';
import { fetchedUser } from '../../toolkit/userSlice';
//REACT-HELMET
import Head from '../../Head';

const process = (time: number) => new Promise(acc => setTimeout(acc, time));

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random/?diary)',
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
    const users = useSelector(selectUser);  //for id of new user only
    const dispatch = useDispatch();

    const [ visiblity1, setVisiblity1 ] = useState<boolean>(false);
    const [ visiblity2, setVisiblity2 ] = useState<boolean>(false);

    const history = useHistory();

    return (
        <>
            <Head title="SignUp"/>

            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image} id="image"/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar} style={{ backgroundColor: dark ? "#5bc0de" : "#000000" }}>
                            <TelegramIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
    
    
    
                        <Formik
                            initialValues={{
                                username: "",
                                email: "",
                                password: "",
                                confirmpassword: "",
                                agreeTnC: false
                            }}
                            validationSchema={
                                object({
                                    username: string()
                                    .max(30, 'Must be atmost 30 character')
                                    .min(3, 'Must have atleast 3 characters')
                                    .required('Must fill username'),
    
                                    email: string()
                                    .email('Must be a valid email')
                                    .max(30, 'Must be atmost 30 character')
                                    .min(5, 'Must be atleast 5 characters')
                                    .required('Must be email'),
    
                                    password: string()
                                    .max(10, 'Must be atmost than 10 characters')
                                    .min(6, 'Must be atleast than 6 characters')
                                    .required('Must fill password'),
    
                                    confirmpassword: string()
                                    .max(10, 'Must be atmost than 10 characters')
                                    .min(6, 'Must be atleast than 6 characters')
                                    .required('Must fill password')
                                    .oneOf([ref("password")], "Both password need to be the same"),
    
                                    agreeTnC: boolean()
                                    .oneOf([true], 'Must be agree to terms & conditions')
                                })
                            }
                            onSubmit={async (values) => {
                                postUser({                    //updating data to server's api
                                    username : values.username,
                                    email    : values.email,
                                    password : values.password,
                                    id       : users.length
                                })
                                dispatch(fetchedUser());      //saving updated data to redux
    
    
                                pageAlert('Registering...', 'top-start', 'info');
                                await process(2500);
                                history.push('/');
                                signupAlert();
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
    
                                    <Box paddingBottom={1}>
                                        <Field fullWidth name='email' component={TextField} label="Email"
                                               color={dark ? "secondary" : "primary"}
                                        />
                                    </Box>
    
                                    <Box paddingBottom={1} display="flex" alignItems="center">
                                        <Field fullWidth name='password' component={TextField} label="Password"
                                               color={dark ? "secondary" : "primary"}
                                               type={visiblity1 ? "text" : "password"}
                                        />
                                        { visiblity1 ? <VisibilityIcon fontSize="small" onClick={() => setVisiblity1(false)}/> : <VisibilityOffIcon fontSize="small" onClick={() => setVisiblity1(true)}/> }
                                    </Box>
    
                                    <Box paddingBottom={1} display="flex" alignItems="center">
                                        <Field fullWidth name='confirmpassword' component={TextField} label="Confirm Password"
                                               color={dark ? "secondary" : "primary"}
                                               type={visiblity2 ? "text" : "password"}
                                        />
                                        { visiblity2 ? <VisibilityIcon fontSize="small" onClick={() => setVisiblity2(false)}/> : <VisibilityOffIcon fontSize="small" onClick={() => setVisiblity2(true)}/> }
                                    </Box>
    
                                    <Box paddingBottom={1}>
                                        <Field name='agreeTnC' type="checkbox" component={CheckboxWithLabel} Label={{label: "I agree to TnC's"}}
                                               color={dark ? "secondary" : "primary"}
                                        />
                                        <ErrorMessage name='agreeTnC' component="p" className="agreeTnC"/>
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
                                        Sign Up
                                    </Button>
    
                                    <Grid container>
                                        <Grid item>
                                            <Linked to='/signin' style={{ color: dark ? "#5bc0de" : "#000000" }}>
                                                Already have an account? Sign in
                                            </Linked>
                                        </Grid>
                                    </Grid>
    
                                    <Box mt={4}>
                                       <Typography variant="body2" color="textSecondary" align="center">
                                            {'Copyright © '}
                                            <Link color="inherit" href="https://material-ui.com/">
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
            </Grid>
        </>
    )
}

export default SigninPage;