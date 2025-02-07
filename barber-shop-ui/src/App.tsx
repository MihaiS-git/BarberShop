import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./components/Root";
import AuthenticationPage from "./pages/Authentication";
import RegistrationPage from "./pages/Registration";
import RecoverPasswordPage from "./pages/RecoverPassword";
import TreatmentsPage from "./pages/Treatments";
import BarbersPage from "./pages/Barbers";
import BarberTreatmentsPage from "./pages/BarberTreatments";
import ContactPage from "./pages/Contact";
import NewPasswordPage from "./pages/NewPassword";
import CartPage from "./pages/Cart";
import AppointmentsPage from "./pages/Appointments";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "login",
                element: <AuthenticationPage />,
            },
            {
                path: "register",
                element: <RegistrationPage />,
            },
            {
                path: "recover-password",
                element: <RecoverPasswordPage />,
            },
            {
                path: "recover-password/:token",
                element: <NewPasswordPage />,
            },
            {
                path: "treatments",
                element: <TreatmentsPage />,
            },
            {
                path: "treatments/:barberId",
                element: <BarberTreatmentsPage />,
            },
            {
                path: "barbers",
                element: <BarbersPage />,
            },
            {
                path: "contact",
                element: <ContactPage />,
            },
            {
                path: 'cart',
                element: <CartPage/>
            },
            {
                path: 'appointments',
                element: <AppointmentsPage/>
            }
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
