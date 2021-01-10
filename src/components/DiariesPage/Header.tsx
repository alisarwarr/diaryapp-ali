import React from 'react';
//MATERIAL-UI
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//ROUTER-DOM
import { useHistory } from 'react-router-dom';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';
import { selectUser } from '../../toolkit/userSlice';
//SWEETALERT2
import { pageDelayAlert } from '../../alerts';

function Header() {
    const dark = useSelector(selectDark);
    const users = useSelector(selectUser);

    let eachMatchedBooleans = users[users.length - 1].map(item => item.matched);   //grap each 'matched' from all objects in form of an array
    let ifAnyMatchedTrue = eachMatchedBooleans?.includes(true);                    //if any index have that value returns true otherwise false    

    const screen700 = useMediaQuery('(max-width:700px)');
    const screen500 = useMediaQuery('(max-width:500px)');

    const history = useHistory();

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
                { 
                    !ifAnyMatchedTrue && <Button disableRipple onClick={() => history.push('/')} size={screen700 ? "small" : "medium"}> HOME </Button>
                }
                <Button
                    disableRipple
                    onClick={() => {
                        history.push('/users');
                        pageDelayAlert('Users');
                    }}
                    size={screen700 ? "small" : "medium"}
                    className="hideon330"
                >
                    USERS
                </Button>                    
                {
                    ifAnyMatchedTrue && <Button disableRipple onClick={() => history.push('/signingout')} size={screen700 ? "small" : "medium"}> SIGNOUT </Button>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;