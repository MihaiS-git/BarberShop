import PageContent from "../components/PageContent";
import NewPasswordForm from '../components/auth/NewPasswordForm'

const NewPasswordPage = () => {
    return (
        <PageContent className="flex items-center justify-center h-screen w-full">
            <NewPasswordForm />
        </PageContent>
    );
}

export default NewPasswordPage;