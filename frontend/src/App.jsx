import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Reg from "./pages/reg.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Doctor from "./pages/doctor.jsx";
import Nurse from "./pages/nurse.jsx";
import Admin from "./pages/admin.jsx";
import Lab from "./pages/lab.jsx";
import ResetPass from "./pages/ResetPass.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import PatientRegistration from "./pages/PatientRegistration.jsx";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import Search from "./pages/Search.jsx";
import More from "./pages/More.jsx";
import Finance from "./pages/Finance.jsx";

Modal.setAppElement("#root");

function App() {
  return (
    <div className="inter-fnt">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more" element={<More />} />
        <Route
          path="/reg"
          element={
            <ProtectedRoute>
              <Reg />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reg/patient-registration"
          element={
            <ProtectedRoute>
              <PatientRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reg/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/register"
          element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <Doctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nurse"
          element={
            <ProtectedRoute>
              <Nurse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/labtech"
          element={
            <ProtectedRoute>
              <Lab />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance"
          element={
            <ProtectedRoute>
              <Finance />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
