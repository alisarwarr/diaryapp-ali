//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../toolkit/userSlice';
import { storeUserid } from '../toolkit/useridSlice';
//SWEETALERT2
import { signinSuccessAlert, signinErrorAlert } from '../alerts';
//ROUTER-DOM
import { Redirect } from 'react-router-dom';

function SigningIn() {
    const users = useSelector(selectUser);
    const dispatch = useDispatch();

    let eachMatchedBooleans = users[users.length - 1].map(item => item.matched);   //grap each 'matched' from all objects in form of an array
    let ifAnyMatchedTrue = eachMatchedBooleans?.includes(true);                    //if any index have that value returns true otherwise false

    let thatUserId = eachMatchedBooleans?.indexOf(true);                           //grapping index of first 'true' value in array  & use as user's id

    if(ifAnyMatchedTrue) {
        dispatch(storeUserid(thatUserId));                                         //saving updated data to redux
        signinSuccessAlert();

        return (
            <>
                <Redirect to="/diaries"/>
            </>
        )
    }
    else {
        signinErrorAlert();

        return (
            <>
               <Redirect to="/"/>
            </>
        )
    }
}

export default SigningIn;