import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

const initialState = {
    username: "",
    email: "",
    avatar: "",
    bio: "",
    bookmarks: [],
    liked_recipes: [],
    error: "",
    loading: false,
}

export const editUser = createAsyncThunk(
    'user/editUser',
    async (data) => {
        let res = null;
        if (data.email !== "" && data.username !== "") {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
            res = await axiosInstance.patch('/user/', data);
        }
        else if (data.email === "" && data.username !== "") {
            delete data.email;
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
            res = await axiosInstance.patch('/user/', data);
        }
        else if (data.username === "" && data.email !== "") {
            delete data.username;
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
            res = await axiosInstance.patch('/user/', data);
        } else {
            throw new Error("No data to update");
        }
        return res.data;
    }
)

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (body) => {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
        const res = await axiosInstance.put('/user/password/change', body);
        return res.data;
    }
)

export const changeAvatar = createAsyncThunk(
    'user/changeAvatar',
    async (data) => {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
        const res = await axiosInstance.put('/user/profile/avatar/', data);
        return res.data;
    }
)

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


        builder.addCase(editUser.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(editUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(editUser.pending, (state, action) => {
            state.loading = true;
        })


        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
        })
        builder.addCase(changePassword.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(changePassword.pending, (state, action) => {
            state.loading = true;
        })


        builder.addCase(changeAvatar.fulfilled, (state, action) => {
            state.avatar = action.payload.avatar;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(changeAvatar.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(changeAvatar.pending, (state, action) => {
            state.loading = true;
        })
    }
})

export default userSlice.reducer;