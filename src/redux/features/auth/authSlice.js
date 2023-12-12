import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

const initialState = {
    token: JSON.parse(localStorage.getItem("token")),
    error: "",
    loading: false,
}

export const fetchToken = createAsyncThunk(
    'auth/fetchToken',
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
        builder.addCase(fetchToken.fulfilled, (state, action) => {
            state.token = action.payload;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(fetchToken.rejected, (state, action) => {
            state.token = null;
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(fetchToken.pending, (state, action) => {
            state.loading = true;
        })
    }
})

export default authSlice.reducer;
// export const authActions = authSlice.actions;
