import AccountForm from "./AccountForm";

const Account = () => {
    return (
        <div className="flex flex-col justify-between align-middle text-center font-medium font-serif  text-yellow-950 text-2xl sm:text-3xl w-12/12">
            <div className="bg-yellow-500 bg-opacity-60 mb-10 w-64 sm:w-96 mx-auto">
                <h2>Account</h2>
            </div>
            <AccountForm />
        </div>
    );
};

export default Account;
