import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import asset from "../assets/Asset";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Doctor = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [dataFetched, setDataFetched] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [patientData, setPatientData] = useState({
    fullname: "",
    cardnumber: "",
    age: "",
    phonenumber: "",
  });
  const [patientHistory, setPatientHistory] = useState([]);
  const [sendPatientHistory, setSendPatientHistory] = useState({
    history: "",
    createdBy: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("http://localhost:2100/api/user/doctor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataFetched(data.data);
      //console.log(data.data);
    };
    fetchData();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.put(
      `http://localhost:2100/api/user/doctor/update-history/${id}`,
      sendPatientHistory,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    //console.log(res.data);
    setId(res.data.message);
    setPatientHistory(res.data.data.history);
    setSendPatientHistory({
      history: "",
      createdBy: "",
    });
  };
  return (
    <div className="h-screen overflow-hidden">
      <nav className="flex justify-between items-center h-16 w-full px-10 py-4">
        <img
          onClick={() => navigate("/admin")}
          className="h-full cursor-pointer"
          src={asset.logo}
          alt=""
        />
        <p>
          Selam <span className="font-bold">Dr. {decoded.username}</span>
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
      <div className="grid grid-cols-4 h-fit my-1 shadow-2xl rounded-2xl">
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold">Card Number</p>
          <p>{patientData.cardnumber}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold">Full Name</p>
          <p>{patientData.fullname}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold">Age</p>
          <p>{patientData.age}</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold">Phone Number</p>
          <p>{patientData.phonenumber}</p>
        </div>
      </div>
      <div className="flex h-5/6 w-full bg-gray-100">
        <div className="w-1/4 overflow-y-scroll mx-3 bg-white rounded-2xl">
          {dataFetched.map((data) => (
            <p
              key={data._id}
              onClick={() => {
                setPatientData({
                  cardnumber: data.cardNumber,
                  fullname: data.fullName,
                  age: data.age,
                  phonenumber: data.phoneNumber,
                });
                setPatientHistory(data.history);
                setId(data._id);
                setClicked(true);
              }}
              className={`shadow-2xs p-2 cursor-pointer hover:bg-amber-50 ${
                data._id == id ? "bg-yellow-100" : ""
              } font-bold`}
            >
              {data.fullName}
            </p>
          ))}
        </div>
        <div className="flex flex-col h-full w-full">
          <div className=" overflow-y-scroll h-3/4">
            <p className="fixed bg-white left-[50%] rounded-2xl px-3">
              Patient history
            </p>
            {patientHistory.length == 0 && (
              <p className="text-center mt-10">No patient history yet</p>
            )}
            <div className="mt-10">
              {patientHistory.map((history) => (
                <div
                  key={history._id}
                  className="w-full bg-gray-200 rounded-2xl p-2 my-1"
                >
                  <p className="text-xl">{history.history}</p>
                  <div className="w-full flex justify-end gap-3 font-thin text-xs text-[#313131]">
                    <p>{history.createdBy}</p>
                    <p>
                      {history.dateCreated
                        ? new Date(history.dateCreated).toString().split("G")[0]
                        : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-1/4 flex justify-center items-center">
            {clicked && (
              <form
                onSubmit={submitHandler}
                className="w-fit p-7 px-14 shadow-2xl rounded-2xl border-[1px] border-gray-300 mb-10"
              >
                <input
                  type="text"
                  placeholder="Write history"
                  required
                  className="outline-none w-2xl"
                  value={sendPatientHistory.history}
                  onChange={(e) =>
                    setSendPatientHistory({
                      history: e.target.value,
                      createdBy: `Dr. ${decoded.username}`,
                    })
                  }
                />

                <button type="submit">
                  <IoSend />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
