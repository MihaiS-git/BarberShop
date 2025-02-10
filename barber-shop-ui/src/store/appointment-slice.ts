import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Appointment } from "../types/appointment";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const saveAppointment = createAsyncThunk<Appointment, { requestBody: Appointment, jwtToken: string }>(
    'appointments/saveAppointment',
    async ({ requestBody, jwtToken }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                const errorMessage = response.status === 400
                    ? "Unable to create appointment. Please check the provided details."
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

export const getAppointmentsByUserId = createAsyncThunk<Appointment[], { _id: string, jwtToken: string }>(
    'appointments/getAppointmentsByUserId',
    async ({ _id, jwtToken }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/appointments/user/${_id}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            if (!response.ok) {
                const errorMessage = response.status === 404
                    ? "Appointments not found."
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

export const updateAppointment = createAsyncThunk<Appointment, { requestBody: Appointment, jwtToken: string }>(
    'appointments/updateAppointment',
    async ({ requestBody, jwtToken }, { rejectWithValue }) => {

        try {
            const response = await fetch(`${BASE_URL}/appointments/${requestBody._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                const errorMessage = response.status === 404
                    ? "Appointment not found."
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

export const deleteAppointment = createAsyncThunk<string, { _id: string, jwtToken: string }>(
    'appointments/deleteAppointment',
    async ({ _id, jwtToken }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/appointments/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            if (!response.ok) {
                const errorMessage = response.status === 404
                    ? "Failed to delete the appointment. Not found."
                    : "Something went wrong. Please try again.";
                return rejectWithValue(errorMessage);
            }
            return _id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    appointments: [],
    loading: false,
    error: null
}

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        removeAppointment: (state, action) => {
            state.appointments = state.appointments.filter((appointment) => appointment._id !== action.payload._id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveAppointment.fulfilled, (state, action) => {
                state.appointments.push(action.payload);
                state.loading = false;
            })
            .addCase(saveAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAppointmentsByUserId.pending, (status) => {
                status.loading = true;
                status.error = null;
            })
            .addCase(getAppointmentsByUserId.fulfilled, (status, action) => {
                status.appointments = action.payload;
                status.loading = false;
            })
            .addCase(getAppointmentsByUserId.rejected, (status, action) => {
                status.loading = false;
                status.error = action.payload;
            })
            .addCase(updateAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                state.appointments = state.appointments.map((appointment) =>
                    appointment._id === action.payload._id ? action.payload : appointment
                );
                state.loading = false;
            })
            .addCase(updateAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = state.appointments.filter((appointment) => appointment._id !== action.payload);
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { removeAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;