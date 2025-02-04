import { Form } from "react-router-dom";
/* import FormInputElement from "./FormInputElement"; */

const RecoverPasswordForm = () => {
    return (
        <Form className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-5/12 xl:w-3/12 2xl:w-3/12 flex flex-col justify-center align-middle bg-yellow-200 px-4 md:px-8 rounded-md">
            <h3 className="text-2xl md:text-3xl text-yellow-950 font-bold my-4 px-2 text-center">
                Recover Password Form
            </h3>
            {/* <FormInputElement
                type="email"
                id="email"
                name="email"
                placeholder="Email"
            /> */}
            <p className="p-2 flex justify-center my-4">
                <button className="bg-yellow-950 text-yellow-400 hover:bg-yellow-400 hover:text-yellow-950 py-2 px-16 rounded-md">
                    Recover
                </button>
            </p>
        </Form>
    );
};

export default RecoverPasswordForm;
