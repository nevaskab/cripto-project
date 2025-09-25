import { createBrowserRouter } from "react-router-dom";
import { Details } from "./pages/Details/Details";
import { Home } from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export { router };
