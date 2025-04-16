import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import User from "./pages/User";
import Register from "./pages/Register";
import Rgpd from "./pages/Rgpd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div className="quatre-cent-quatre">
        <h1>404 Not Found</h1>
      </div>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "rgpd",
        element: <Rgpd />,
      },
    ],
  },
]);

export default router;
