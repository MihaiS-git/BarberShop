import PageContent from "../components/PageContent";
import Treatments from "../components/treatments/Treatments";

export default function TreatmentsPage() {
    return (
        <PageContent className="flex items-center justify-center h-screen w-full">
            <Treatments />
        </PageContent>
    );
}