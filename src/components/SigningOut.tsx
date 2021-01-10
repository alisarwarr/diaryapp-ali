import { useEffect } from 'react';
//REDUX-TOOLKIT
import { useDispatch } from 'react-redux';
import { quitUser } from '../toolkit/userSlice';
//SWEETALERT2
import { signoutSuccessAlert } from '../alerts';
//ROUTER-DOM
import { Redirect } from 'react-router-dom';

function SigningOut() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(quitUser());
    }, [])

    return (
        <>
            <Redirect to="/"/> {signoutSuccessAlert()}
        </>
    )
}

export default SigningOut;