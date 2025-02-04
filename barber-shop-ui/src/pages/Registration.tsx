import PageContent from "../components/PageContent";
import RegistrationForm from "../components/auth/RegistrationForm";

const RegistrationPage = () => {
    return (
        <PageContent className="flex items-center justify-center h-screen w-full">
            <RegistrationForm />
        </PageContent>
    ); 
 };

export default RegistrationPage;