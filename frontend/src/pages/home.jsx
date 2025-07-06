import { Link, useNavigate } from "react-router-dom";
import asset from "../assets/Asset";
import { CiLogin } from "react-icons/ci";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-gray-100">
      <nav className="flex justify-between items-center h-16 w-full px-10 py-4">
        <img className="h-full" src={asset.logo} alt="" />
      </nav>
      <div className="flex flex-col justify-center items-center h-3/4">
        <h1 className="text-2xl font-bold p-3">
          Wellcome to <span className="text-blue-950">Medi</span>Track
        </h1>
        <p className="pb-3">
          Created by{" "}
          <Link
            to={"https://mathias-bekele.vercel.app"}
            target="_blank"
            className="cursor-pointer bg-gradient-to-br from-yellow-500 to-blue-900 bg-clip-text text-transparent font-bold hover:border-b-2 hover:border-blue-900"
          >
            Mathias Bekele
          </Link>
        </p>
        <p>To help organize data flow and access in hospitals</p>
        <div className="flex gap-3 mt-4">
          <div
            onClick={() => navigate("/more")}
            className="flex justify-center items-center gap-2 cursor-pointer hover:bg-gradient-to-br hover:from-yellow-700 hover:to-blue-950 p-2 m-2 text-shadow-2xs rounded-2xl hover:text-white"
          >
            <p className="font-bold">Learn More</p>
          </div>
          <div
            onClick={() => navigate("/login")}
            className="flex justify-center items-center gap-2 cursor-pointer bg-gradient-to-br from-blue-950 via-blue-700 to-black rounded-2xl py-0 my-2 px-2 text-white hover:from-black hover:via-blue-800 text-shadow-2xs"
          >
            <p className="font-bold">Login</p>
            <CiLogin />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
