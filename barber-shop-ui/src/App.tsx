import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RootLayout from "./components/Root";
import AuthenticationPage from "./pages/Authentication";
import RegistrationPage from "./pages/Registration";
import RecoverPasswordPage from "./pages/RecoverPassword";

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
      }

    ]
  }]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
