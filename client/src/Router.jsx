import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import User from "./pages/User";
import Login from "./pages/Login";
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
        path: "",
        element: <Login />,
      },
      {
        path: "user",
        element: <User />,
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
