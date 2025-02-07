import { useDispatch } from "react-redux";
import { Appointment } from "../../types/appointment";
import { deleteAppointment } from "../../store/appointment-slice";
import { AppDispatch } from "../../store";
import useAuth from "../../contexts/auth/useAuth";

const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { authState } = useAuth();

    const jwtToken = authState.jwtToken;

    const handleDeleteAppointment = () => {
        dispatch(deleteAppointment({_id: appointment._id, jwtToken}));
    };

    return (
        <div className="flex flex-row justify-between items-center text-center w-full mx-auto my-4 shadow-[2px_2px_6px] shadow-yellow-950 bg-yellow-900">
            <div className="flex flex-row justify-between w-full mx-4 text-sm">
                    <p className="p-4 m-2">{appointment.startDateTime}</p><br />
                    <p className="p-4 m-2">{appointment.duration}</p><br />
                    <p className="p-4 m-2">{appointment.totalPrice}</p><br />
                    <p className="p-4 m-2">{appointment.approvalStatus}</p><br />
            </div>
            <button
                type="button"
                className="bg-yellow-950 text-yellow-200 hover:bg-yellow-200 hover:text-yellow-950 w-7 h-7 text-xs p-1 md:text-base me-4 cursor-pointer"
                onClick={handleDeleteAppointment}
            >
                X
            </button>
        </div>
    );
};

export default AppointmentCard;
