import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { APIProvider } from "./context/APIContext";

function App() {
  return (
    <>
      <APIProvider>
        <RouterProvider router={router} />
      </APIProvider>
    </>
  );
}

export default App;
