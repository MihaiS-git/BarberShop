import PageContent from "../components/PageContent";
import Appointments from "../components/appointments/Appointments";

const AppointmentsPage = () => {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto lg:px-6 py-24 w-12/12 md:w-6/12 bg-yellow-100 bg-opacity-50">
            <Appointments />
        </PageContent>
    );
}

export default AppointmentsPage;