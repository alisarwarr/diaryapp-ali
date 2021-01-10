import React from 'react';
//MATERIAL-UI
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { Typography } from '@material-ui/core';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDark, changeDark } from '../../toolkit/darkSlice';
//SWEETALERT2
import { darkAlert } from '../../alerts';

function Body() {
    const dark = useSelector(selectDark);
    const dispatch = useDispatch();

    return (
        <>
            <div>
                <Typography className="p1" id={dark ? "darkRespectTextOutlined" : "lightRespectTextOutlined"}>
                    Diary
                </Typography>

                <Typography className="p2" id={dark ? "darkRespectText" : "lightRespectText"}>
                    “ By beginning a diary, I was already conceding that life would be more bearable if I looked at it as an adventure and a tale. I was telling myself the story of a life, and this transmutes into an adventure the things which can shatter you. ”
                    <p><b><i> ― Anaïs Nin </i></b></p>
                </Typography>
            </div>

            <button
                className={`btn btn-outline-${dark ? `info` : `dark` }`}
                onClick={() => {
                    dispatch(changeDark());
                    darkAlert(dark);
                }}
            >
                { dark ? <Brightness4Icon fontSize="small"/>: <Brightness7Icon fontSize="small"/> }
                <span style={{ marginLeft: "0.2rem" }}> { dark ? `light` : `dark` } theme </span>
            </button>
        </>
    )
}

export default Body;