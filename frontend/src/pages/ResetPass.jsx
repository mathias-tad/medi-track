import { useEffect, useState } from "react";
import asset from "../assets/Asset";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";

const ResetPass = () => {
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [username, setUsername] = useState("");
  const [newPassword, setPassword] = useState("");
  const [resetOTP, setResetOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [second, setSecond] = useState(180);
  const [disp, setDisp] = useState("OTP Expires");
  const navigate = useNavigate();

  const countDown = () => {
    const tm = setInterval(() => {
      setSecond((prev) => prev - 1);
    }, 1000);
  };

  const otpHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "https://medi-track-backend.onrender.com/api/auth/sendotp",
        {
          username,
        }
      );
      //console.log(res);
      setLoading(false);
      if (res.data.success) {
        toast.success(res.data.message);
        setIsOTPsent(true);
        countDown();
      }
      if (!res.data.success) toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const resetHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "https://medi-track-backend.onrender.com/api/auth/reset-password",
        {
          username,
          resetOTP,
          newPassword,
        }
      );
      //console.log(res);
      setLoading(false);
      if (res.data.success) {
        toast.success(res.data.message);
        setIsOTPsent(false);
        navigate("/login");
      }
      if (!res.data.success) toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const submitHandler = isOTPsent ? resetHandler : otpHandler;

  return (
    <div>
      <nav className="h-16 w-full pl-10 py-4">
        <div
          className="h-full cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <img className="h-full" src={asset.logo} alt="" />
        </div>
      </nav>
      <div className="w-full pt-16 flex justify-center items-center">
        <div className="bg-amber-50 p-10 rounded-2xl shadow-2xl">
          <h1 className="text-center font-bold text-2xl pb-7">
            Reset your password
          </h1>
          <form className="w-fit h-fit mx-auto" onSubmit={submitHandler}>
            {!isOTPsent && (
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
            )}
            {isOTPsent && (
              <div>
                <div className="flex justify-center items-center mb-2">
                  <img src={"otp.svg"} alt="" className="w-7" />
                  <input
                    className="outline-none pl-3"
                    type="text"
                    placeholder="Enter OTP sent to your email"
                    onChange={(e) => setResetOTP(e.target.value)}
                  />
                </div>
                <p
                  className={`text-center ${second <= 0 ? "text-red-500" : ""}`}
                >
                  {second >= 0 ? second : disp}
                </p>
                <div className="flex justify-center items-center">
                  <RiLockPasswordLine />
                  <input
                    className="outline-none pl-3"
                    type="password"
                    required
                    placeholder="Set a new Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-center my-3">
              <button
                className="border-2 bg-gradient-to-r from-blue-800 to-blue-950 text-white rounded-full px-6 mt-4 cursor-pointer font-bold disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {isOTPsent
                  ? loading
                    ? "Resetting..."
                    : "Reset"
                  : loading
                  ? "Sending OTP..."
                  : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
