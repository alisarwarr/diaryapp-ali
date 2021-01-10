//SWEETALERT2
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

export const darkAlert = (dark: boolean) => {
    Swal.fire({
        icon: 'info',
        title: `<p id="design">${!dark ? `Dark` : `Light`}</p>`,
        text: `You enabled ${!dark ? `Dark` : `Light`} Theme!`,
        timer: 2000,
        showConfirmButton: false
    })
}

export const signupAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '<p id="design">successfully SignedUp!</p>',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
    })
}

export const signinSuccessAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '<p id="design">successfully SignIn!</p>',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
    })
}

export const signinErrorAlert = () => {
    Swal.fire({
        icon: 'error',
        title: `<p id="design">Can't SignIn!</p>`,
        text: 'incorrect Username or Password',
        confirmButtonText: 'Retry'
    })
}

export const signoutSuccessAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '<p id="design">successfully SignOut!</p>',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
    })
}

export const pageDelayAlert = (title: string) => {
    Swal.fire({
        icon: 'info',
        title: `<p id="design">${title}</p>`,
        text: `welcome to ${title} page`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
    })
}

export const pageAlert = (title = 'Something happened', position?: SweetAlertPosition, alertType?: SweetAlertIcon): void => {
    Swal.fire({
        title,
        icon: alertType,
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
        showCancelButton: true,
        cancelButtonText: 'Close',
        toast: true,
        position,
        //CSS classes for animations when showing a popup (fade in)
        showClass: {
            popup: 'swal2-noanimation',
            backdrop: 'swal2-noanimation'
        },
        //CSS classes for animations when hiding a popup (fade out)
        hideClass: {
            popup: '',
            backdrop: ''
        }
    })
}