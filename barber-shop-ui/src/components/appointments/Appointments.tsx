import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import useAuth from "../../contexts/auth/useAuth";
import { getAppointmentsByUserId } from "../../store/appointment-slice";
import AppointmentCard from "./AppointmentCard";

const Appointments = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { appointments, loading, error } = useSelector((state: RootState) => state.appointments);
    const { authState } = useAuth();
    const userId = authState.userId;
    const userRole = authState.role;
    const jwtToken = authState.jwtToken;

    useEffect(() => {
        dispatch(getAppointmentsByUserId({ _id: userId, jwtToken: jwtToken }));
    }, [userId, jwtToken, userRole, dispatch]);

    
    if (!authState.isAuthenticated) throw new Error('Not authorized action. Must authenticate.');
    if (loading) return <div>Loading...</div>;
    if (error)
        return (
            <div className="bg-slate-400 rounded-lg p-2 text-fuchsia-600 text-center font-bold text-lg mb-4">
                {error}
            </div>
        );

    return (
        <div className="flex flex-col justify-around align-middle text-center font-medium font-serif  text-yellow-950 text-2xl sm:text-3xl">
            <div className="bg-yellow-500 bg-opacity-60 mb-10 w-64 sm:w-96 mx-auto">
                <h2>Appointments</h2>
            </div>
            <div className="bg-yellow-400  text-yellow-950 lg:col-span-2 h-full flex flex-col justify-center items-center">
                    {appointments.length > 0 ? (
                        <ul className="w-11/12 sm:w-10/12 xl:w-8/12">
                            {appointments.map((item, index) => (
                                <li key={index}>
                                    <AppointmentCard appointment={item} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-yellow-900 font-bold text-lg p-8">
                                No appointments found. Maybe create a new one.
                            </p>
                        </div>
                    )}
                </div>
        </div>
    );
};

export default Appointments;
