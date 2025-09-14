import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import asset from "../assets/Asset";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    position: "",
  });
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const changeHandeler = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setClicked(true);
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const res = await axios.post(
        `${serverAddress}/api/auth/register`,
        signupData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setLoading(false);
      setSignupData({
        username: "",
        email: "",
        password: "",
        position: "",
      });
      setClicked(false);
      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <nav className="h-16 w-full pl-10 py-4">
        <img
          onClick={() => navigate("/admin")}
          className="h-full cursor-pointer"
          src={asset.logo}
          alt=""
        />
      </nav>
      <div className="w-full pt-16 flex justify-center items-center">
        <div className="bg-amber-50 p-10 rounded-2xl">
          <h1 className="text-center font-bold text-2xl pb-7">
            Signup for a new account
          </h1>
          <form className="w-fit h-fit mx-auto" onSubmit={submitHandler}>
            <div className="flex justify-center items-center mb-2">
              <CiUser />
              <input
                className="outline-none pl-3"
                name="username"
                type="text"
                value={signupData.username}
                required
                placeholder="Username"
                onChange={changeHandeler}
              />
            </div>

            <div className="flex justify-center items-center mb-2">
              <MdOutlineMailOutline />
              <input
                className="outline-none pl-3"
                type="email"
                placeholder="Email"
                name="email"
                value={signupData.email}
                required
                onChange={changeHandeler}
              />
            </div>
            <div className="flex justify-center items-center mb-2">
              <RiLockPasswordLine />
              <input
                className="outline-none pl-3"
                type="password"
                name="password"
                value={signupData.password}
                required
                placeholder="Password"
                onChange={changeHandeler}
              />
            </div>
            <div>
              <select
                className="outline-none"
                name="position"
                value={signupData.position}
                onChange={changeHandeler}
              >
                <option value="" disabled>
                  Position?
                </option>
                <option value="reg">Registration</option>
                <option value="doctor">Doctor</option>
                <option value="labtech">Labtech</option>
                <option value="nurse">Nurse</option>
                <option value="finance">Finance</option>
              </select>
              <p className="text-red-500 font-thin italic">
                {signupData.position == "" && clicked
                  ? "Please select position"
                  : ""}
              </p>
            </div>

            <div className="flex justify-center my-3">
              <button
                className="border-2 bg-gradient-to-r from-blue-800 to-blue-950 text-white rounded-full px-6 mt-4 cursor-pointer font-bold disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create new"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
