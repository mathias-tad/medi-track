import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import asset from "../assets/Asset";
import ActivePatientsList from "./ActivePatientsList";
import { useState } from "react";
import axios from "axios";
export var founded = [];
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function Reg() {
  const navigate = useNavigate();
  const [searchBy, setSearchBy] = useState("bynumber");
  const [type, setType] = useState("number");
  const [search, setSearch] = useState("");
  const [patientFound, setPatientFound] = useState([]);
  const token = localStorage.getItem("token");
  var found = {};
  const decoded = jwtDecode(token);

  const clickHandler = async (e) => {
    e.preventDefault();
    if (search) {
      try {
        found = await axios.get(
          searchBy == "bynumber"
            ? `https://medi-track-backend.onrender.com/api/user/reg/search?phoneNumber=${search}`
            : `https://medi-track-backend.onrender.com/api/user/reg/search?fullName=${search}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(found.data);
        setPatientFound(found.data);
      } catch (error) {
        console.log(error);
      }

      console.log(patientFound);
    }
    founded = found.data;
    if (patientFound) navigate("/reg/search");
  };

  return (
    <>
      <nav className="flex justify-between items-center h-16 w-full px-10 py-4">
        <img
          onClick={() => navigate("/admin")}
          className="h-full cursor-pointer"
          src={asset.logo}
          alt=""
        />
        <p>
          Selam <span className="font-bold"> {decoded.username}</span>
        </p>
        <div
          className="cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
            toast.success("Loged out successfuly");
          }}
        >
          <p className="bg-blue-950 text-white rounded-full w-7 h-7 flex justify-center items-center font-bold">
            {decoded.username.slice(0, 1).toUpperCase()}
          </p>
        </div>
      </nav>
      <div
        onClick={() => navigate("/reg/patient-registration")}
        className="flex justify-end items-center pr-2.5 mt-5"
      >
        <p className="font-bold p-2 rounded-2xl cursor-pointer bg-gradient-to-r from-blue-600 to-blue-900 text-amber-50 animate-pulse">
          New Registration
        </p>
      </div>
      <div className="flex justify-center items-center mt-5">
        <form className="flex gap-2 justify-between items-center">
          <input
            className="outline-none border-b-2 border-b-blue-900 w-3xs text-center"
            type={type}
            placeholder="Search for existing patient"
            required
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={clickHandler} type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="flex justify-center my-3">
        <select
          className="outline-none"
          onChange={(e) => {
            setSearchBy(e.target.value);
            e.target.value == "byname" ? setType("text") : setType("number");
          }}
        >
          <option value="bynumber" defaultChecked>
            Search by Phone number
          </option>
          <option value="byname">Search by name (not recomended)</option>
        </select>
      </div>

      <ActivePatientsList />
    </>
  );
}

export default Reg;
