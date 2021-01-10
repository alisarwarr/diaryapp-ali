import React from 'react';
//MATERIAL-UI
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//ROUTER-DOM
import { useHistory } from 'react-router-dom';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
//SWEETALERT2
import { pageDelayAlert, pageAlert } from '../../alerts';

function Header() {
    const dark = useSelector(selectDark);
    const history = useHistory();

    const screen700 = useMediaQuery('(max-width:700px)');
    const screen500 = useMediaQuery('(max-width:500px)');

    return (
        <AppBar
            elevation={0}
            className="header"
            id={dark ? "darkRespectAll" : "lightRespectAll"}
        >
            <Toolbar className="toolbar">
                <Typography className="toolbar_heading" onClick={() => history.push('/')}>
                    Diary {screen500 ? `App` : `Application`} 
                </Typography>

                <div>
                    <Button
                        disableRipple
                        onClick={() => {
                            history.push('/signin');
                            pageAlert('Signin Form', 'top-end', 'success');                            
                        }}
                        size={screen700 ? "small" : "medium"}
                    >
                        SIGN IN
                    </Button>
                   
                    <Button
                        disableRipple
                        onClick={() => {
                            history.push('/signup');
                            pageAlert('Signup Form', 'top-start', 'success');
                        }}
                        size={screen700 ? "small" : "medium"}
                    >
                        SIGN UP
                    </Button>
                    
                    <Button
                        disableRipple
                        onClick={() => {
                            history.push('/users');
                            pageDelayAlert('Users');
                        }}
                        size={screen700 ? "small" : "medium"}
                        className="hideon430"
                    >
                        USERS
                    </Button>
                    
                    <Button
                        disableRipple
                        onClick={() => {
                            history.push('/diaries');
                            pageDelayAlert('Diaries');
                        }}
                        size={screen700 ? "small" : "medium"}
                        className="hideon430"
                    >
                        DIARIES
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;