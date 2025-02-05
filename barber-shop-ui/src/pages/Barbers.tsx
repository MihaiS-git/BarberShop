import PageContent from "../components/PageContent";
import Barbers from "../components/users/Barbers";

const BarbersPage = () => {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto px-6 py-36 w-11/12 bg-yellow-100 bg-opacity-50">
            <Barbers />
        </PageContent>
    );
}

export default BarbersPage;