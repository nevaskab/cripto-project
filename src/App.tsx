import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { APIProvider } from "./context/APIContext";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <APIProvider>
        <Home children={undefined} />
      </APIProvider>
    </>
  );
}

export default App;
