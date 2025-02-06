import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAuth from "../contexts/auth/useAuth";
import { Appointment } from "../types/appointment";

const BASE_URL = 'http://localhost:8080';

export const saveAppointment = createAsyncThunk<Appointment, { requestBody: Appointment }>(
    'appointments/saveAppointment',
    async (requestBody, { rejectWithValue }) => {
        const { authState } = useAuth();
        const jwtToken = authState.jwtToken;
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
                console.log("saveAppointment response: ", response);
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

export const getAppointmentsByCustomerId = createAsyncThunk<Appointment[], string>(
    'appointments/getAppointmentsByCustomerId',
    async (_id, { rejectWithValue }) => {
        const { authState } = useAuth();
        const jwtToken = authState.jwtToken;
        try {
            const response = await fetch(`${BASE_URL}/appointments/customer/${_id}`, {
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

export const getAppointmentsByBarberId = createAsyncThunk<Appointment[], string>(
    'appointments/getAppointmentsByBarberId',
    async (_id, { rejectWithValue }) => {
        const { authState } = useAuth();
        const jwtToken = authState.jwtToken;
        try {
            const response = await fetch(`${BASE_URL}/appointments/barber/${_id}`, {
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

export const updateAppointment = createAsyncThunk<Appointment, { _id: string, requestBody: Appointment }>(
    'appointments/updateAppointment',
    async ({ _id, requestBody }, { rejectWithValue }) => {
        const { authState } = useAuth();
        const jwtToken = authState.jwtToken;
        try {
            const response = await fetch(`${BASE_URL}/appointments/${_id}`, {
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

export const deleteAppointment = createAsyncThunk<string, string>(
    'appointments/deleteAppointment',
    async (_id, { rejectWithValue }) => {
        const { authState } = useAuth();
        const jwtToken = authState.jwtToken;
        try {
            const response = await fetch(`${BASE_URL}/appointments/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
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
            .addCase(getAppointmentsByCustomerId.pending, (status) => {
                status.loading = true;
                status.error = null;
            })
            .addCase(getAppointmentsByCustomerId.fulfilled, (status, action) => {
                status.appointments = action.payload;
                status.loading = false;
            })
            .addCase(getAppointmentsByCustomerId.rejected, (status, action) => {
                status.loading = false;
                status.error = action.payload;
            })
            .addCase(getAppointmentsByBarberId.pending, (status) => {
                status.loading = true;
                status.error = null;
            })
            .addCase(getAppointmentsByBarberId.fulfilled, (status, action) => {
                status.appointments = action.payload;
                status.loading = false;
            })
            .addCase(getAppointmentsByBarberId.rejected, (status, action) => {
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