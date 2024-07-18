import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import WelcomePage from "./pages/WelcomePage";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "welcome",
        element: <WelcomePage />,
      },
      {
        path: "connexion",
        element: <ConnexionPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        path: "cgu",
        element: <CguPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "creation-recipe",
        element: <RecipeCreationPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "set-profile",
        element: <SetProfilePage />,
      },
      {
        path: "recipe/:id",
        element: <RecipePage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);

export default router;
