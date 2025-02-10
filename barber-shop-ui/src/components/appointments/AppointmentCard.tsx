import { useDispatch } from "react-redux";
import { Appointment } from "../../types/appointment";
import {
    deleteAppointment,
    updateAppointment,
} from "../../store/appointment-slice";
import { AppDispatch } from "../../store";
import useAuth from "../../contexts/auth/useAuth";
import { useState } from "react";
import { ApprovalStatus } from "../../types/approvalStatus";

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({
    appointment,
}) => {
    const [startDateTime, setStartDateTime] = useState(appointment.startDateTime ?? "");
    const [approvalStatus, setApprovalStatus] = useState(appointment.approvalStatus ?? "");
    const dispatch = useDispatch<AppDispatch>();
    const { authState } = useAuth();

    const jwtToken = authState.jwtToken;

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(appointment.totalPrice);

    const handleDeleteAppointment = () => {
        dispatch(deleteAppointment({ _id: appointment._id, jwtToken }));
    };

    const handleDatePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDateTime(e.target.value);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setApprovalStatus(e.target.value as ApprovalStatus);
    };

    const handleUpdateAppointment = () => {
        const requestBody = { ...appointment, startDateTime, approvalStatus: approvalStatus as ApprovalStatus };
        dispatch(updateAppointment({ requestBody, jwtToken }));
        alert("Appointment updated successfully!");
    };

    return (
        <div className="p-2 my-2 lg:my-4 shadow-[2px_2px_6px] shadow-yellow-950 bg-yellow-900">
            <div className="p-1 lg:p-4 lg:m-2 lg:mx-4 text-xs lg:text-sm">
                <label
                    htmlFor="startDateTime"
                    className="text-yellow-400 p-1"
                >
                    Date/Time:
                </label>
                <input
                    className="bg-yellow-50 p-1"
                    type="datetime-local"
                    id="startDateTime"
                    name="startDateTime"
                    value={new Date(startDateTime)
                        .toISOString()
                        .slice(0, 16)}
                    onChange={handleDatePicker}
                    disabled={appointment.approvalStatus.toLowerCase() === 'approved' || appointment.approvalStatus.toLowerCase() === 'rejected'}
                />
            </div>
            <div className="flex flex-col items-center lg:mx-4 text-xs lg:text-sm">
                <br />
                <div>
                    <p className="text-yellow-400">
                        Duration: {appointment.duration} mins
                    </p>
                </div>
                <p className="text-yellow-400 p-1">
                    Price: {formattedPrice}
                </p>

                {authState.role.toLowerCase() === "barber" ? (
                    <div className="p-1">
                        <p className="text-yellow-400 p-1">
                            Status:  
                            <select
                                className="bg-yellow-50 p-1 text-yellow-950"
                                name="approvalStatus"
                                id="approvalStatus"
                                value={approvalStatus}
                                onChange={handleStatusChange}
                                disabled={appointment.approvalStatus.toLowerCase() === 'approved'}
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="APPROVED">APPROVED</option>
                                <option value="REJECTED">REJECTED</option>
                            </select>
                        </p>
                    </div>
                ) : (
                    <p className="p-1 m-1 text-yellow-400 text-base">
                        {appointment.approvalStatus.toUpperCase()}
                    </p>
                )}
                <br />
            </div>
            <button
                type="button"
                className="bg-yellow-950 text-yellow-400 hover:bg-yellow-200 hover:text-yellow-950 text-xs p-2 m-2 md:text-base cursor-pointer"
                onClick={handleUpdateAppointment}
            >
                Update
            </button>
            <button
                type="button"
                className="bg-yellow-950 text-yellow-400 hover:bg-yellow-200 hover:text-yellow-950 text-xs p-2 md:text-base me-4 my-auto cursor-pointer"
                onClick={handleDeleteAppointment}
            >
                X
            </button>
        </div>
    );
};

export default AppointmentCard;
