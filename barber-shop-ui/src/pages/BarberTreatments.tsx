import PageContent from "../components/PageContent";
import BarberTreatments from "../components/treatments/BarberTreatments";

const BarberTreatmentsPage = () => {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto px-6 py-24 w-12/12 lg:w-11/12 bg-yellow-100 bg-opacity-50">
            <BarberTreatments/>
        </PageContent>
    );
}

export default BarberTreatmentsPage;