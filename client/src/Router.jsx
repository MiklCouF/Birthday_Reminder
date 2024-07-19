import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Register from "./pages/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Login />,
    children: [
      {
        path: "welcome",
        element: <Body />,
      },
      {
        path: "login",
        element: <ConnexionPage />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // {
      //   path: "cgu",
      //   element: <CguPage />,
      // },
      // {
      //   path: "home",
      //   element: <HomePage />,
      // },
      // {
      //   path: "search",
      //   element: <SearchPage />,
      // },
      // {
      //   path: "favorites",
      //   element: <FavoritesPage />,
      // },
      // {
      //   path: "creation-recipe",
      //   element: <RecipeCreationPage />,
      // },
      // {
      //   path: "profile",
      //   element: <ProfilePage />,
      // },
      // {
      //   path: "set-profile",
      //   element: <SetProfilePage />,
      // },
      // {
      //   path: "recipe/:id",
      //   element: <RecipePage />,
      // },
      // {
      //   path: "admin",
      //   element: <AdminPage />,
      // },
    ],
  },
]);

export default router;
