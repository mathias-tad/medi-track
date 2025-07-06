import axios from "axios";
import { useEffect, useState } from "react";

const ActivePatientsList = () => {
  const token = localStorage.getItem("token");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2100/api/user/reg", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPatients(res.data);
        //console.log(res.data);
      });
  }, []);

  const clickHandler = (id) => {
    useEffect(() => {
      axios
        .post(`http://localhost:2100/api/user/reg/activate/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => console.log(res));
    });
  };

  return (
    <div className="mx-auto mt-7 p-5">
      <div className="grid grid-cols-5 mb-3">
        <p className="font-bold">Full Name</p>
        <p className="font-bold">Phone Number</p>
        <p className="font-bold">Age</p>
        <p></p>
        <p></p>
      </div>
      {!patients.length && (
        <p className="text-center mt-7">No active patients</p>
      )}
      {patients.length &&
        patients.map((patient) => (
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
                  <p>Inctive</p>
                </div>
              )}
            </div>
            {patient.active ? (
              <button disabled className="cursor-not-allowed">
                Activate
              </button>
            ) : (
              <button
                onClick={clickHandler(patient._id)}
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

export default ActivePatientsList;
