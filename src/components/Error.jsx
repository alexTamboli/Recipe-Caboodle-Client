import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { clearError } from '../redux/features/error/errorSlice';
import { clearAuthError } from '../redux/features/auth/authSlice';
import { clearUserError } from '../redux/features/user/userSlice';

export default function Error() {

    const dispatch = useDispatch();

    const error = useSelector(state => state.error.error);
    const userError = useSelector(state => state.user.error);
    const authError = useSelector(state => state.auth.error);

    const notify = (err, num) => {
        toast.error(err, {
            position: "top-center",
            autoClose: 20000,
            toastId: "error",
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        if (num === 1) {
            dispatch(clearError());
        } else if (num === 2) {
            dispatch(clearUserError());
        } else if (num === 3) {
            dispatch(clearAuthError());
        }
    }
    if (error) {
        notify(error, 1);
    } else if (userError) {
        notify(userError, 2);
    } else if (authError) {
        notify(authError, 3);
    }


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={20000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
