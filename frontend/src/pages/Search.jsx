import { IoPersonAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import asset from "../assets/Asset";
import { founded } from "./reg";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const token = localStorage.getItem("token");

const Search = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="flex justify-between items-center h-16 w-full px-10 py-4">
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
      <div className="grid grid-cols-5 mb-3">
        <p className="font-bold">Full Name</p>
        <p className="font-bold">Phone Number</p>
        <p className="font-bold">Age</p>
        <p></p>
        <p></p>
      </div>
      {!founded.length && (
        <p className="text-center mt-7">No patient founded</p>
      )}
      {founded.length &&
        founded.map((patient) => (
          <div key={patient._id} className="grid grid-cols-5">
            <p>{patient.fullName}</p>
            <p>{patient.phoneNumber}</p>
            <p>{patient.age}</p>
            <div>
              {patient.active && (
                <div className="flex justify-start gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p>Active</p>
                </div>
              )}
              {!patient.active && (
                <div className="flex justify-start gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <p>Inactive</p>
                </div>
              )}
            </div>
            {patient.active ? (
              <button disabled className="cursor-not-allowed">
                Activate
              </button>
            ) : (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await axios
                    .post(
                      `http://localhost:2100/api/user/reg/activate`,
                      { id: patient._id },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    )
                    .then((res) => {
                      console.log(res);
                      toast.success("Activated");
                    });
                }}
                className="cursor-pointer"
              >
                Activate
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default Search;
