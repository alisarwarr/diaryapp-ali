import React from 'react';
//REDUX-TOOLKIT
import { useSelector } from 'react-redux';
import { selectDark } from '../../toolkit/darkSlice';

function Footer() {
    const dark = useSelector(selectDark);

    return (
        <footer
            className="footer page-footer font-small stylish-color-dark pt-4"
            id={dark ? "darkRespectAll" : "lightRespectAll"}
        >
            <div className="footer-copyright text-center"> © 2020 Copyright:
                <a href="https://www.writediary.com/" target="_blank" rel="noreferrer"> writediary.com </a>
            </div>
        </footer>
    )
}

export default Footer;