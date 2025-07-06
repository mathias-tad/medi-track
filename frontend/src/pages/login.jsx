import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import asset from "../assets/Asset";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:2100/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      const decoded = jwtDecode(res.data.token);
      console.log(decoded);
      if (decoded) {
        navigate(`/${decoded.position}`);
        toast.success(`Welcome ${decoded.username}`);
      } else navigate("/login");
    } catch (error) {
      if (error.status == 400) toast.error("Incorect Password");
      if (error.status == 404) toast.error("User not found contact the Admin");
    }
  };

  return (
    <>
      <nav className="h-16 w-full pl-10 py-4">
        <div className="h-full cursor-pointer" onClick={() => navigate("/")}>
          <img className="h-full" src={asset.logo} alt="" />
        </div>
      </nav>
      <div className="w-full pt-16 flex justify-center items-center">
        <div className="bg-amber-50 p-10 rounded-2xl shadow-2xl">
          <h1 className="text-center font-bold text-2xl pb-7">Please login</h1>
          <form className="w-fit h-fit mx-auto" onSubmit={submitHandler}>
            <div className="flex justify-center items-center mb-2">
              <CiUser />
              <input
                className="outline-none pl-3"
                type="text"
                required
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center">
              <RiLockPasswordLine />
              <input
                className="outline-none pl-3"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center my-3">
              <button
                className="border-2 bg-gradient-to-r from-blue-800 to-blue-950 text-white rounded-full px-6 mt-4 cursor-pointer font-bold"
                type="submit"
              >
                Login
              </button>
            </div>
            <p
              onClick={() => navigate("/reset-password")}
              className="underline cursor-pointer text-blue-500 text-sm text-right"
            >
              Forgot password?
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
