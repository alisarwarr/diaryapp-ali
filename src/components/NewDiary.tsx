import React from 'react';
//MATERIAL-UI
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//SWEETALERT2
import Swal from 'sweetalert2';                //dispatching data thats why using here directly
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { selectDiary, fetchedDiary } from '../toolkit/diarySlice';
import { selectUserid } from '../toolkit/useridSlice';
//AXIOS
import { postDiary } from '../api';

function NewDiary() {
    const userid = useSelector(selectUserid);
    const diaries = useSelector(selectDiary);  //for id of new diary only
    const dispatch = useDispatch();


    const handleChange = async () => {
        const { value } = await Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next',
            showCancelButton: true,
            progressSteps: ['1', '2', '3'],
        }).queue([
            {
                title : '<p id="design">Diary Title</p>',
                text  : 'What title for Diary?',
                input : 'text'
            },
            {
                title        : '<p id="design">Diary Privacy</p>',
                text         : 'Choose privacy for Diary?',
                input        : 'radio',
                inputOptions : {
                    public   : 'Public',
                    private  : 'Private'
                },
                inputValue   : 'public'
            },
            {
                title            : '<p id="design">Diary Notes</p>',
                input            : 'textarea',
                inputPlaceholder : 'Type your notes here...',
            }
        ]) as any;

        if (value) {                           //value as Array if Swal containing multiple value
            if(value[0] === "") {
                Swal.fire({
                    icon: 'warning',
                    title: '<p id="design">Cancelled</p>',
                    text: 'You need to give Title!',
                    confirmButtonText: 'Retry'
                })
            }
            else if(value[2] === "") {
                Swal.fire({
                    icon: 'warning',
                    title: '<p id="design">Cancelled</p>',
                    text: 'You need to give Notes!',
                    confirmButtonText: 'Retry'
                })
            }
            else if (value[0] && value[1] && value[2]) {
                postDiary({                    //updating data to server's api
                    title       : value[0],
                    privacy     : value[1],
                    notes       : value[2],
                    id          : diaries.length,
                    userId      : userid,
                    createdDate : `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
                    createdTime : new Date().toLocaleTimeString()
                })

                dispatch(fetchedDiary());      //saving updated data to redux

                Swal.fire({
                    icon: 'success',
                    title: '<p id="design">Diary Created</p>',
                    text: 'You created a Diary!',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: '<p id="design">Cancelled</p>',
                text: 'regristration cancelled!',
                confirmButtonText: 'Close'
            })    
        }
    }


    const screen700 = useMediaQuery('(max-width:700px)');

    return (
        <Button disableRipple onClick={handleChange} style={{ width: "7rem" }} size={screen700 ? "small" : "medium"}>
            NEW DIARY
        </Button>
    )
}

export default NewDiary;