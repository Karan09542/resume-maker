import { useState } from "react";
import "./App.css";
import ResumeInputs from "./Components/ResumeInputs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./Components/SideBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <p className="text-3xl">हर हर महादेव</p> */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <SideBar />
      <ResumeInputs />
    </>
  );
}

export default App;
