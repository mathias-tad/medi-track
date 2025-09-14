import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import asset from "../assets/Asset";
import { toast } from "react-toastify";

const Lab = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  return (
    <div>
      <nav className="flex justify-between items-center h-16 w-full px-10 py-4">
        <img
          onClick={() => navigate("/labtech")}
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
      <p className="font-bold text-2xl text-center mt-10">
        This page is under development...
      </p>
      <p className="text-center">Labtech department's Page</p>
    </div>
  );
};

export default Lab;
