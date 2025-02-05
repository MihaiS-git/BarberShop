import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInputElement from "./FormInputElement";
import { validateAge } from "../../utils/validateAge";

const BASE_URL = "http://localhost:8080";

const RegistrationForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [dob, setDob] = useState<Date>(new Date());
    const [errors, setErrors] = useState<{ field: string; message: string }[]>(
        []
    );
    const navigate = useNavigate();
    
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        setErrors((prevErrors) => {
            const filteredErrors = prevErrors.filter(
                (error) => error.field !== "email"
            );
            if (!emailRegex.test(email)) {
                return [
                    ...filteredErrors,
                    { field: "email", message: "Invalid email address." },
                ];
            }
            return filteredErrors;
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
        setErrors((prevErrors) => {
            const filteredErrors = prevErrors.filter(
                (error) => error.field !== "password"
            );
            if (password.trim().length < 8) {
                return [
                    ...filteredErrors,
                    {
                        field: "password",
                        message: "Password must be at least 8 characters long.",
                    },
                ];
            }
            return filteredErrors;
        });
    };

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
        setErrors((prevErrors) => {
            const filteredErrors = prevErrors.filter(
                (error) => error.field !== "confirmPassword"
            );
            if (password !== confirmPassword) {
                return [
                    ...filteredErrors,
                    {
                        field: "confirmPassword",
                        message: "Passwords do not match.",
                    },
                ];
            }
            return filteredErrors;
        });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setName(name);
        setErrors((prevErrors) => {
            const filteredErrors = prevErrors.filter(
                (error) => error.field !== "name"
            );
            if (name.trim().length < 2) {
                return [
                    ...filteredErrors,
                    {
                        field: "name",
                        message: "Name must be at least 2 characters long.",
                    },
                ];
            }
            return filteredErrors;
        });
    };

    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateOfBirth = new Date(e.target.value);
        setDob(dateOfBirth);
        setErrors((prevErrors) => {
            const filteredErrors = prevErrors.filter(
                (error) => error.field !== "dob"
            );
            if (!validateAge(dateOfBirth)) {
                return [
                    ...filteredErrors,
                    {
                        field: "dob",
                        message: "You must be at least 18 years old.",
                    },
                ];
            }
            if(dateOfBirth < new Date('01/01/1900')){
                return [
                    ...filteredErrors,
                    {
                        field: "dob",
                        message: "Year is not valid.",
                    },
                ];
            }
            return filteredErrors;
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestBody = {
            email: email,
            password: password,
            name: name,
            dob: dob.toLocaleDateString('en-GB'),
        };
        console.log(requestBody);

        try {
            const response = await fetch(`${BASE_URL}/auth/signup`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();

            console.log("Data: ", data);

            if (!response.ok) {
                setErrors([{ field: "general", message: data.message }]);
                return;
            }
            navigate("/login");
        } catch (error) {
            if (error instanceof Error) {
                setErrors([
                    {
                        field: "general",
                        message: error.message || "An error occurred.",
                    },
                ]);
            } else {
                setErrors([
                    { field: "general", message: "An unknown error occurred." },
                ]);
            }
        }
    };

    return (
        <form
            method="post"
            onSubmit={(e) => handleSubmit(e)}
            className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-5/12 xl:w-3/12 2xl:w-3/12 flex flex-col justify-center align-middle bg-yellow-200 px-4 md:px-8"
        >
            <h3 className="text-2xl md:text-3xl text-yellow-950 font-bold my-4 px-2 text-center">
                Signup Form
            </h3>

            {errors.length > 0 && (
                <div className="text-red-500 text-sm text-center">
                    <p>Please correct the errors below:</p>
                </div>
            )}

            <FormInputElement
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleEmailChange}
                required={true}
            />
            {errors.some((error) => error.field === "email") && (
                <p className="text-red-500 text-sm">
                    {errors.find((error) => error.field === "email")?.message}
                </p>
            )}

            <FormInputElement
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handlePasswordChange}
                required={true}
            />
            {errors.some((error) => error.field === "password") && (
                <p className="text-red-500 text-sm">
                    {
                        errors.find((error) => error.field === "password")
                            ?.message
                    }
                </p>
            )}

            <FormInputElement
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={handleConfirmPasswordChange}
                required={true}
            />
            {errors.some((error) => error.field === "confirmPassword") && (
                <p className="text-red-500 text-sm">
                    {
                        errors.find(
                            (error) => error.field === "confirmPassword"
                        )?.message
                    }
                </p>
            )}

            <FormInputElement
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Name"
                onChange={handleNameChange}
                required={true}
            />
            {errors.some((error) => error.field === "name") && (
                <p className="text-red-500 text-sm">
                    {errors.find((error) => error.field === "name")?.message}
                </p>
            )}

            <label htmlFor="dob" className="mx-2 mt-2 px-2">
                Date of Birth
            </label>
            <FormInputElement
                type="date"
                id="dob"
                name="dob"
                value={dob.toISOString().split("T")[0]}
                placeholder={new Date().toISOString().split("T")[0]}
                onChange={handleDobChange}
                required={true}
            />
            {errors.some((error) => error.field === "dob") && (
                <p className="text-red-500 text-sm">
                    {errors.find((error) => error.field === "dob")?.message}
                </p>
            )}

            <p className="p-2 flex justify-center my-4">
                <button
                    type="submit"
                    className="bg-yellow-950 text-yellow-400 hover:bg-yellow-400 hover:text-yellow-950 py-2 px-16 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
                    disabled={errors.length === 0 ? false : true}
                >
                    Signup
                </button>
            </p>
        </form>
    );
};

export default RegistrationForm;
