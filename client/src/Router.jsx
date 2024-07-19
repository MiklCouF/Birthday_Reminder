import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import User from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 Not Found</h1>,
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
    ],
  },
]);

export default router;
