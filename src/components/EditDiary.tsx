import React from 'react';
//MATERIAL-UI
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//SWEETALERT2
import Swal from 'sweetalert2';                               //dispatching data thats why using here directly
//REDUX-TOOLKIT
import { useDispatch } from 'react-redux';
import { editNotes, editTitle, editPrivacy } from '../toolkit/diarySlice';

interface EditDiaryProp {
    id: number;
    privacy: 'private' | 'public';
    title: string;
    notes: string;
}

function EditDiary({ id, title, notes, privacy }: EditDiaryProp) {
    const dispatch = useDispatch();


    const handleEdit = async() => {
        const { value } = await Swal.fire({
            title             : '<p id="design">Edit Diary</p>',
            text              : 'Choose to edit for Diary?',
            input             : 'radio',
            inputOptions      : {
                title         : 'Title',
                privacy       : 'Privacy',
                notes         : 'Notes'
            },
            inputValue        : 'title',
            confirmButtonText : 'Next',
            showCancelButton  : true
        }) as any;
        
        if(value === undefined) {
            Swal.fire({
                icon: 'error',
                title: '<p id="design">Cancelled</p>',
                text: 'editing cancelled!',
                confirmButtonText: 'Close'
            })
        }
        else if(value === "notes") {
            (() => {
                handleNotes();
            })()
        }
        else if(value === "title") {
            (() => {
                handleTitle();
            })()
        }
        else if(value === "privacy") {
            (() => {
                handlePrivacy();
            })()
        }
    }


    const handleNotes = async () => {
        const { value } = await Swal.fire({
            title: '<p id="design">Diary Notes</p>',
            input: 'textarea',
            inputPlaceholder: 'Edit your diary notes here...',
            inputValue: notes,
            confirmButtonText : 'Save',
            showCancelButton: true
        }) as any;

        if (value === undefined) {
            Swal.fire({
                icon: 'error',
                title: '<p id="design">Cancelled</p>',
                text: 'editing Notes cancelled!',
                confirmButtonText: 'Close'
            })
        }
        else if (value === "") {
            Swal.fire({
                icon: 'warning',
                title: '<p id="design">Cancelled</p>',
                text: 'You need to edit Notes!',
                confirmButtonText: 'Retry'
            })
        }
        else if(value === notes) {
            Swal.fire({
                icon: 'info',
                title: `<p id="design">Notes Unchanged </p>`,
                text: `Notes remain same!`,
                confirmButtonText: 'Close'
            })        
        }
        else if (value !== "") {
            dispatch(editNotes({ notes: value, id: id }));    //sending as object to redux for only device not server's api

            Swal.fire({
                icon: 'success',
                title: '<p id="design">Diary Edited</p>',
                text: 'You edited notes!',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }


    const handleTitle = async() => {
        const { value } = await Swal.fire({
            title: '<p id="design">Diary Title</p>',
            text: 'Edit title for Diary?',
            input: 'text',
            inputValue: title,
            confirmButtonText : 'Save',
            showCancelButton: true
        }) as any;

        if(value === undefined) {
            Swal.fire({
                icon: 'error',
                title: '<p id="design">Cancelled</p>',
                text: 'editing Title cancelled!',
                confirmButtonText: 'Close'
            })    
        }
        else if (value === "") {
            Swal.fire({
                icon: 'warning',
                title: '<p id="design">Cancelled</p>',
                text: 'You need to edit Title!',
                confirmButtonText: 'Retry'
            })
        }
        else if(value === title) {
            Swal.fire({
                icon: 'info',
                title: `<p id="design">Title Unchanged </p>`,
                text: `Title remain same!`,
                confirmButtonText: 'Close'
            })        
        }
        else if (value !== "") {
            dispatch(editTitle({ title: value, id: id }));    //sending as object to redux for only device not server's api

            Swal.fire({
                icon: 'success',
                title: '<p id="design">Diary Edited</p>',
                text: 'You edited Title!',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }


    const handlePrivacy = async() => {
        const { value } = await Swal.fire({
            title        : '<p id="design">Diary Privacy</p>',
            text         : 'Edit privacy for Diary?',
            input        : 'radio',
            inputOptions : {
                public   : 'Public',
                private  : 'Private'
            },
            inputValue   : 'public',
            confirmButtonText : 'Save',
            showCancelButton: true
        })

        if(value === undefined) {
            Swal.fire({
                icon: 'error',
                title: '<p id="design">Cancelled</p>',
                text: 'editing Title cancelled!',
                confirmButtonText: 'Close'
            })
        }
        else if(value === privacy) {
            Swal.fire({
                icon: 'info',
                title: `<p id="design">Privacy Unchanged </p>`,
                text: `Privacy remain same!`,
                confirmButtonText: 'Close'
            })        
        }
        else if(value === "public") {
            dispatch(editPrivacy({ privacy: value, id: id }));    //sending as object to redux for only device not server's api

            Swal.fire({
                icon: 'success',
                title: '<p id="design">Diary Edited</p>',
                text: 'You edited Privacy!',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else if(value === "private") {
            dispatch(editPrivacy({ privacy: value, id: id }));    //sending as object to redux for only device not server's api

            Swal.fire({
                icon: 'success',
                title: '<p id="design">Diary Edited</p>',
                text: 'You edited Privacy!',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }


    const screen700 = useMediaQuery('(max-width:700px)');

    return (
        <Button disableRipple onClick={handleEdit} style={{ width: "7rem" }} size={screen700 ? "small" : "medium"}>
            EDIT
        </Button>
    )
}

export default EditDiary;