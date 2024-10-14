import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AuthentificationPage from "./components/AuthentificationPage";
import Gestion from "./components/Gestion";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthentificationPage />
    },
    {
      path: "/gestion",
      element: <Gestion />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App;
