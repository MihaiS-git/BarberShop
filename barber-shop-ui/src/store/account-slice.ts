import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/user";

const BASE_URL = 'http://localhost:8080';

export const getAccount = createAsyncThunk<User, {_id: string, jwtToken: string}>(
    'account/getAccount',
    async ({ _id, jwtToken }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/account/${_id}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            if (!response.ok) {
                const errorMessage = response.status === 404
                    ? "Account not found."
                    : "Something went wrong. Please try again.";
                return rejectWithValue(errorMessage);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateAccount = createAsyncThunk<User, { _id: string, user: User, jwtToken: string }>(
    'account/updateAccount',
    async ({ _id, user, jwtToken }, { rejectWithValue }) => { 
        try {
            const response = await fetch(`${BASE_URL}/account/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify(user)
            });
            console.log("RESPONSE: ", response);
            
            if (!response.ok) {
                const errorMessage = response.status === 404
                    ? "Account not found."
                    : "Something went wrong. Please try again.";
                return rejectWithValue(errorMessage);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAccount.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(getAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(updateAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default accountSlice.reducer;