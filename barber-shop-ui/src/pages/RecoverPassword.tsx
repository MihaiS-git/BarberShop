import PageContent from "../components/PageContent";
import RecoverPasswordForm from "../components/auth/RecoverPasswordForm";

const RecoverPasswordPage = () => { 
    return (
        <PageContent className="flex items-center justify-center h-screen w-full">
            <RecoverPasswordForm />
        </PageContent>

    );
};

export default RecoverPasswordPage;