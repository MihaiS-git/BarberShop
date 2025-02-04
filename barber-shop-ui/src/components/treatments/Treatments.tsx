import { useEffect } from "react";
import useTreatments from "../../contexts/treatments/useTreatments";
import TreatmentCard from "./TreatmentCard";

const Treatments: React.FC = () => {
    const { treatments, isLoading, error, fetchTreatments } = useTreatments();

    useEffect(() => {
        fetchTreatments();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col justify-around align-middle text-center font-medium font-serif  text-yellow-950 text-2xl sm:text-3xl">
            <div className="bg-yellow-500 bg-opacity-60 mb-10 w-64 sm:w-96 mx-auto">
                <h2>Treatments</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {treatments.map((treatment, index) => {
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
