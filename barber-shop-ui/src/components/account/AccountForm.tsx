import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../contexts/auth/useAuth";
import { AppDispatch } from "../../store";
import { RootState } from "../../store";
import { getAccount, updateAccount } from "../../store/account-slice";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import { useTreatments } from "../../hooks/useTreatments";

const AccountForm = () => {
    const { user, loading, error } = useSelector(
        (state: RootState) => state.account
    );
    const [name, setName] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const { authState } = useAuth();
    const navigate = useNavigate();

    const jwtToken = authState.jwtToken;
    const userId = authState.userId;

    const {
        data: treatments,
        isLoading: treatmentsLoading,
        error: treatmentsError,
    } = useTreatments();

    useEffect(() => {
        if (jwtToken && userId) {
            dispatch(getAccount({ _id: userId, jwtToken }));
        }
    }, [dispatch, jwtToken, userId]);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setDob(user.dob || "");
        }
    }, [user]);

    if (!authState.isAuthenticated)
        throw new Error("Not authorized action. Must authenticate.");
    if (loading) return <div>Loading...</div>;
    if (error)
        return (
            <div className="bg-yellow-400 rounded-lg p-2 text-yellow-950 text-center font-bold text-lg mb-4">
                {error}
            </div>
        );

    if (treatmentsLoading) return <div>Loading treatments...</div>;
    if (treatmentsError)
        return <div>Failed to load treatments: {treatmentsError.message}</div>;

    const barberTreatments = treatments.filter((treatment) =>
        user.treatmentIds.includes(treatment._id)
    );
    const barberTreatmentNames: string[] = [];
    barberTreatments.forEach((treatment) =>
        barberTreatmentNames.push(treatment.name)
    );

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDob(e.target.value);
    };

    const handleSubmit = () => {
        const reqBody = {
            ...user,
            name,
            dob,
        };

        dispatch(
            updateAccount({ _id: userId, user: reqBody as User, jwtToken })
        );
    };

    const handleClose = () => {
        navigate("/home");
    };

    const formattedDob = dob ? new Date(dob).toISOString().slice(0, 10) : "";

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-around align-middle items-center text-center font-medium font-serif  text-yellow-950 text-2xl sm:text-3xl w-12/12">
                <p>
                    <img
                        className="w-60 h-60 object-cover shadow-[2px_2px_6px] shadow-yellow-950"
                        src={user.pictureUrl}
                        alt={user.name}
                    />
                </p>
                <form method="PUT" onSubmit={handleSubmit}>
                    <div className="flex flex-row text-yellow-950 mx-4 mt-8 p-1 lg:mx-4 text-xs lg:text-sm">
                        <p className="mx-4 font-bold">E-mail:</p>
                        <p className="mx-4">{user.email}</p>
                    </div>

                    <div className="flex flex-row text-yellow-950 mx-4 p-1 lg:mx-4 text-xs lg:text-sm">
                        <label htmlFor="name" className="m-2 font-bold">
                            Name:{" "}
                        </label>
                        <input
                            className="m-2 bg-yellow-50 text-yellow-950 border-yellow-900 border"
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={user?.name || name}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="flex flex-row text-yellow-950 mx-4 p-1 lg:mx-4 text-xs lg:text-sm">
                        <p className="mx-4 font-bold">Role:</p>
                        <p className="mx-4">{user.role.toUpperCase()}</p>
                    </div>

                    <div className="p-1 text-xs lg:text-sm">
                        <label htmlFor="dob" className="font-bold">
                            Date of birth:{" "}
                        </label>
                        <input
                            className="bg-yellow-50 p-1"
                            type="date"
                            name="dob"
                            id="dob"
                            value={formattedDob}
                            onChange={handleDobChange}
                        />
                    </div>

                    {user.treatmentIds.length > 0 && (
                        <div className="p-1 text-xs lg:text-sm">
                            <p className="font-bold">Treatments:</p>
                            <ul>
                                {barberTreatmentNames.map(
                                    (treatmentName, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className="text-yellow-950 mx-4 p-1 text-xs lg:text-sm"
                                            >
                                                {treatmentName}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    )}

                    {user.notAvailable.length > 0 && (
                        <div>
                            <p>Not available times:</p>
                            <p>{user.notAvailable}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-yellow-950 text-yellow-400 hover:bg-yellow-200 hover:text-yellow-950 text-xs p-2 m-2 md:text-base cursor-pointer"
                    >
                        Update
                    </button>
                </form>
            </div>
            <div className="flex flex-row justify-end align-bottom">
                <button
                    type="button"
                    className="bg-yellow-950 text-yellow-400 hover:bg-yellow-200 hover:text-yellow-950 text-xs font-medium py-1 px-2 md:text-base mt-16 me-4 my-auto cursor-pointer"
                    onClick={handleClose}
                >
                    X
                </button>
            </div>
        </>
    );
};

export default AccountForm;
