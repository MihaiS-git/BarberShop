import { Key } from "react";
import {useTreatments} from "../../hooks/useTreatments";
import { Treatment } from "../../types/treatment";
import TreatmentCard from "./TreatmentCard";

const Treatments: React.FC = () => {
    const { data: treatments, isLoading, error } = useTreatments();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col justify-around align-middle text-center font-medium font-serif  text-yellow-950 text-2xl sm:text-3xl">
            <div className="bg-yellow-500 bg-opacity-60 mb-10 w-64 sm:w-96 mx-auto">
                <h2>Treatments</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {treatments?.map((treatment: Treatment, index: Key | null | undefined) => {
                    return (
                        <li key={index}>
                            <TreatmentCard treatment={treatment} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Treatments;
