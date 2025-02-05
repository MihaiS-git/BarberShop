import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./components/Root";
import AuthenticationPage from "./pages/Authentication";
import RegistrationPage from "./pages/Registration";
import RecoverPasswordPage from "./pages/RecoverPassword";
import TreatmentsPage from "./pages/Treatments";
import BarbersPage from "./pages/Barbers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'login',
        element: <AuthenticationPage />
      },
      {
        path: 'register',
        element: <RegistrationPage />
      },
      {
        path: 'recover-password',
        element: <RecoverPasswordPage />
      },
      {
        path: 'treatments',
        element: <TreatmentsPage />
      },
      {
        path: 'barbers',
        element: <BarbersPage />
      },
      //TODO reset password

    ]
  }]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
