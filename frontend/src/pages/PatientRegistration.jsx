import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import asset from "../assets/Asset";
import { IoPersonAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    fullName: "",
    phoneNumber: 0,
    age: 0,
  });

  const changeHandeler = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const submitHundler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://medi-track-backend.onrender.com/api/user/reg/patient-reg",
        patientData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Patient registered successfuly");
      setPatientData({ fullName: "", phoneNumber: "", age: 0 });
    } catch (error) {
      if (error.status == 500) toast.error("This number is already registered");
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <nav className="flex justify-between items-center h-16 w-full px-10 py-4 mb-28">
        <img
          onClick={() => navigate("/reg")}
          className="h-full cursor-pointer"
          src={asset.logo}
          alt=""
        />
        <div
          className="cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <IoPersonAddOutline />
        </div>
      </nav>
      <div className="flex flex-col justify-center items-center bg-amber-50 w-fit rounded-2xl p-5">
        <h2 className="font-bold text-2xl mb-2">Register a new patient</h2>
        <form className="flex-col w-fit justify-center items-center">
          <input
            className="block w-full outline-none border-b-2 border-black p-1 mb-3"
            type="text"
            placeholder="Full name"
            name="fullName"
            required
            onChange={changeHandeler}
          />
          <input
            className="block w-full outline-none border-b-2 border-black p-1 mb-3"
            type="text"
            placeholder="Phone number"
            name="phoneNumber"
            required
            onChange={changeHandeler}
          />
          <input
            className="block w-full outline-none border-b-2 border-black p-1 mb-3"
            type="number"
            placeholder="Age"
            name="age"
            required
            onChange={changeHandeler}
          />
          <button
            onClick={submitHundler}
            className="block cursor-pointer border-2 bg-gradient-to-r from-blue-800 to-blue-950 text-white rounded-full px-6 mt-4 font-bold"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
