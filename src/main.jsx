import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Resume from "./Components/Resume.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/resume/:resumeId",
    element: <Resume />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
