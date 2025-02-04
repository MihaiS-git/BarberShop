import PageContent from "../components/PageContent";
import Treatments from "../components/treatments/Treatments";

export default function TreatmentsPage() {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto px-6 py-36 w-11/12 bg-yellow-100 bg-opacity-50">
            <Treatments />
        </PageContent>
    );
}