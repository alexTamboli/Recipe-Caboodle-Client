import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

const initialState = {
    username: "",
    email: "",
    avatar: "",
    error: "",
    loading: false,
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
        const resUser = await axiosInstance.get('/user/');
        const resAvatar = await axiosInstance.get('/user/profile/avatar/');
        const res = {
            user: resUser.data,
            avatar: resAvatar.data.avatar,
        }
        console.log(res);
        return res;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.username = action.payload.user.username;
            state.email = action.payload.user.email;
            state.avatar = action.payload.avatar;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.username = "";
            state.email = "";
            state.avatar = "";
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
        })
    }
})

export default userSlice.reducer;