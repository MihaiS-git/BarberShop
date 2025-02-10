import { Form, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import FormInputElement from "./FormInputElement";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const NewPasswordForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<{ field: string; message: string }[]>(
        []
    );
    const navigate = useNavigate();

    const {token} = useParams();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        setEmail(email);
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,6}$/;
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requestBody = {
            email,
            password,
            token
        };

        try {
            const response = await fetch(`${BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            if (!response.ok) {
                setErrors([
                    {
                        field: "general",
                        message:
                            data.message ||
                            "Recover password failed. Please try again with a valid email.",
                    },
                ]);
                return;
            }
            alert('Password changed successfully!');
            navigate("#/login");
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
        <Form
            className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-5/12 xl:w-3/12 2xl:w-3/12 flex flex-col justify-center align-middle bg-yellow-200 px-4 md:px-8"
            onSubmit={handleSubmit}
        >
            <h3 className="text-2xl md:text-3xl text-yellow-950 font-bold my-4 px-2 text-center">
                Recover Password Form
            </h3>
            {errors.length > 0 && (
                <div className="text-red-500 text-sm text-center">
                    <p>Please correct the errors below:</p>
                    {errors.map((e, index) => {
                        return <p key={index}>{e.message}</p>;
                    })}
                </div>
            )}

            <FormInputElement
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleEmailChange}
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
            <p className="p-2 flex justify-center my-4">
                <button
                    type="submit"
                    className="bg-yellow-950 text-yellow-400 hover:bg-yellow-400 hover:text-yellow-950 py-2 px-16 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
                    disabled={errors.length === 0 ? false : true}
                >
                    Save
                </button>
            </p>
        </Form>
    );
};

export default NewPasswordForm;
