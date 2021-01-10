import React from 'react';
import { pic1 } from '../../images';
import DelayRender from '../../DelayRender';
//MATERIAL-UI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//ROUTER-DOM
import { useHistory } from 'react-router-dom';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark, changeDark } from '../../toolkit/darkSlice';
import { selectUser } from '../../toolkit/userSlice';
//SWEETALERT2
import { darkAlert, pageAlert, pageDelayAlert } from '../../alerts';

function Data() {
    const dark = useSelector(selectDark);
    const users = useSelector(selectUser);
    const dispatch = useDispatch();

    let eachMatchedBooleans = users[users.length-1].map(item => item.matched);   //grap each 'matched' from all objects in form of an array
    let ifAnyMatchedTrue = eachMatchedBooleans?.includes(true);                  //if any index have that value returns true otherwise false    

    const screen292 = useMediaQuery('(max-width:292px)');
    const screen700 = useMediaQuery('(max-width:700px)');
    const screen420 = useMediaQuery('(max-width:420px)');

    const history = useHistory();

    return (
        <>
            {
                (ifAnyMatchedTrue)    //means any one signedin
                ? (
                    <div className="jumbotron" id={dark ? "darkRespectAll" : "lightRespectAll"}>
                        <img
                            src={pic1}
                            alt="User"
                        />

                        <hr className="my-1"/>
            
                        <p className="lead">
                            <div className="container">
                                <span> {!screen292 ? `Wanna Visit Now?` : `Visit Now!`} </span>
                                <Hidden smDown>
                                    <Button disableRipple onClick={() => { history.push('/diaries'); pageDelayAlert('Diaries'); }} style={{ width: "7rem" }} size={screen700 ? "small" : "medium"} id="btn">
                                        VISIT DIARY
                                    </Button>
                                </Hidden>
                            </div>
    
                            <div className="showon960">
                                <Hidden mdUp>
                                    <Button disableRipple onClick={() => { history.push('/diaries'); pageDelayAlert('Diaries'); }} style={{ width: "7rem" }} size={screen700 ? "small" : "medium"} id="btn">
                                        VISIT DIARY
                                    </Button>
                                </Hidden>
    
                                <IconButton
                                    disableRipple
                                    onClick={() => { dispatch(changeDark()); darkAlert(dark); }}
                                    style={{ backgroundColor: "transparent" }}
                                    id="iconbutton"
                                >
                                    { dark ? <Brightness4Icon fontSize="small"/>: <Brightness7Icon fontSize="small"/> }
                                </IconButton>
                            </div>
                        </p>
                    </div>
                ) : (
                    <DelayRender>
                    <div className="jumbotron jumbotron2" id={dark ? "darkRespectAll" : "lightRespectAll"}>
                        <h1 className="display-4"> {!screen420 ? `Create Diary!` : `Diary!`} </h1>
            
                        <p className="lead lead2">
                            "The life is like a diary".
                            <br/> <p><i style={{ color: dark ? "#000000" : "#5bc0de" }}>James Matthew</i></p>
                        </p>
            
                        <hr className="my-4"/>
            
                        <p className="lead">
                            <div className="container">
                                <span> {!screen292 ? `Wanna SignIn Now?` : `SignIn Now?`}  </span>
                                <Button
                                    id="btns"
                                    disableRipple
                                    style={{ marginLeft: "1.05rem" }}
                                    onClick={() => {
                                        history.push('/signin');
                                        pageAlert('Signin Form', 'top-end', 'success');                            
                                    }}
                                    size={screen292 ? "small" : "medium"}
                                >
                                    SIGN <br/> IN
                                </Button>
                            </div>
            
                            <div className="container">
                                <span> {!screen292 ? `Wanna SignUp Now?` : `SignUp Now?`}  </span>
                                <Button
                                    id="btns"
                                    disableRipple
                                    onClick={() => {
                                        history.push('/signup');
                                        pageAlert('Signup Form', 'top-start', 'success');
                                    }}
                                    size={screen292 ? "small" : "medium"}
                                >

                                    SIGN <br/> UP
                                </Button>
                            </div>
            
                            <IconButton
                                disableRipple
                                onClick={() => { dispatch(changeDark()); darkAlert(dark); }}
                                style={{ backgroundColor: "transparent", marginLeft: "-2.05rem", marginTop: "0.25rem" }}
                                id="iconbutton"
                            >
                                { dark ? <Brightness4Icon fontSize="small"/>: <Brightness7Icon fontSize="small"/> }
                            </IconButton>
                        </p>
                    </div>
                    </DelayRender>
                )
            }
        </>
    )
}

export default Data;