import PageContent from "../components/PageContent";
import AuthForm from "../components/auth/AuthForm";

const AuthenticationPage = () => { 
    return (
        <PageContent className="flex items-center justify-center h-screen w-full">
            <AuthForm />
        </PageContent>
    );
};

export default AuthenticationPage;