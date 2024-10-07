import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Resume from "./Components/Resume.jsx";
import Pdf_Page from "./Components/react-pdf/Pdf_Page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/resume/:resumeId",
    element: <Resume />,
  },
  {
    path: "/pdf-resume/:resumeId",
    element: <Pdf_Page />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
