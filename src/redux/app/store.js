import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import errorReducer from '../features/error/errorSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        error: errorReducer,
    }
});

export default store;
