import React, { useEffect } from 'react';
//MATERIAL-UI
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//ROUTER-DOM
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark } from './toolkit/darkSlice';
import { fetchedUser } from './toolkit/userSlice';
import { fetchedDiary } from './toolkit/diarySlice';
//COMPONENTS
import { FrontPage, SigninPage, SignupPage, UsersPage, DiariesPage, SigningIn, SigningOut, HisPublicDiariesPage } from './components';

function App() {
    const dark = useSelector(selectDark);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchedUser());       //saving initial data to redux
        dispatch(fetchedDiary());      //saving initial data to redux
    }, [])

    const theme = createMuiTheme({
        palette: {
            type: dark ? "dark" : "light",
            background: {     //black     //skyblue
                paper: dark ? "#000000" : "#5bc0de"
            },
            primary: {
                main: "#000000"
            },
            secondary: {
                main: "#5bc0de"
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <FrontPage
                        />
                    </Route>

                    <Route path='/signin' exact>
                        <SigninPage
                        />
                    </Route>

                    <Route path='/signup' exact>
                        <SignupPage
                        />
                    </Route>

                    <Route path='/users' exact>
                        <UsersPage
                        />
                    </Route>

                    <Route path='/diaries' exact>
                        <DiariesPage
                        />
                    </Route>

                    <Route path='/signingin' exact>
                        <SigningIn
                        />
                    </Route>

                    <Route path='/signingout' exact>
                        <SigningOut
                        />
                    </Route>

                    <Route path='/hispublicdiaries' exact>
                        <HisPublicDiariesPage
                        />
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    )
}

export default App;