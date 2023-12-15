import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

const initialState = {
    token: JSON.parse(localStorage.getItem("token")),
    error: "",
    loading: false,
}

export const registerFetchToken = createAsyncThunk(
    'auth/registerFetchToken',
    async (userData) => {
        if (password === confirmPassword) {
            const body = JSON.stringify({
                username,
                email,
                password,
            });
            const res = await axiosInstance.post('/user/register/', body);
            localStorage.setItem("token", JSON.stringify(res.data.tokens));
            return res.data.tokens;
        } else {
            throw new Error("Passwords do not match");
        }
    }
)

export const loginFetchToken = createAsyncThunk(
    'auth/loginFetchToken',
    async (userData) => {
        const res = await axiosInstance.post('/user/login/', userData);
        localStorage.setItem("token", JSON.stringify(res.data.tokens));
        return res.data.tokens;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginFetchToken.fulfilled, (state, action) => {
            state.token = action.payload;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(loginFetchToken.rejected, (state, action) => {
            state.token = null;
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(loginFetchToken.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(registerFetchToken.fulfilled, (state, action) => {
            state.token = action.payload;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(registerFetchToken.rejected, (state, action) => {
            state.token = null;
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(registerFetchToken.pending, (state, action) => {
            state.loading = true;
        })
    }
})

export default authSlice.reducer;
// export const authActions = authSlice.actions;
