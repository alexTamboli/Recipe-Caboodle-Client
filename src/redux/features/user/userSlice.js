import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import axios from 'axios';

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
        try {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
            const res = await axiosInstance.put('/user/password/change', body);
            return res.data;
        } catch (error) {
            if (error.response.data.old_password && error.response.data.old_password[0]) {
                throw new Error(error.response.data.old_password[0]);
            }
            else if (error.response.data.new_password && error.response.data.new_password[0]) {
                throw new Error(error.response.data.new_password[0]);
            } else {
                throw new Error("Something went wrong");
            }
        }



    }
)

export const changeAvatar = createAsyncThunk(
    'user/changeAvatar',
    async (data) => {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
        axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
        const res = await axiosInstance.patch('/user/profile/avatar/', data);
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

export const fetchUserExtraDetails = createAsyncThunk(
    'user/fetchUserExtraDetails',
    async () => {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("token")).access}`;
        const res = await axiosInstance.get('/user/profile');
        return res.data;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError(state) {
            state.error = null;
        }
    },
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


        builder.addCase(fetchUserExtraDetails.fulfilled, (state, action) => {
            state.bio = action.payload.bio;
            state.bookmarks = action.payload.bookmarks;
            state.liked_recipes = action.payload.liked_recipes;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(fetchUserExtraDetails.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(fetchUserExtraDetails.pending, (state, action) => {
            state.loading = true;
        })
    }
})

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;