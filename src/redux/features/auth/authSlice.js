import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

const initialState = {
    token: JSON.parse(localStorage.getItem("token")),
    error: "",
    loading: false,
}

export const registerFetchToken = createAsyncThunk(
    'auth/registerFetchToken',
    async ({ username, email, password, confirmPassword }) => {
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
        try {
            const res = await axiosInstance.post('/user/login/', userData);
            localStorage.setItem("token", JSON.stringify(res.data.tokens));
            return res.data.tokens;
        } catch (error) {
            if (error.response.data.non_field_errors && error.response.data.non_field_errors[0]) {
                throw new Error(error.response.data.non_field_errors[0]);
            } else {
                throw new Error("Something went wrong");
            }
        }
    }
)



export const logout = createAsyncThunk(
    'auth/logout',
    async (refresh) => {
        const body = JSON.stringify({ refresh });
        await axiosInstance.post('/user/logout/', body);
        localStorage.removeItem("token");
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null;
        }
    },
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


        builder.addCase(logout.fulfilled, (state, action) => {
            state.token = null;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true;
        })
    }
})

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
