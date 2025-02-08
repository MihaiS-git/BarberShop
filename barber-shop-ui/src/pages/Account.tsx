import Account from "../components/account/Account";
import PageContent from "../components/PageContent";


const AccountPage = () => {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto px-6 pt-36 pb-8 w-12/12 md:w-6/12 bg-yellow-100 bg-opacity-50">
            <Account />
        </PageContent>
    );
};

export default AccountPage;