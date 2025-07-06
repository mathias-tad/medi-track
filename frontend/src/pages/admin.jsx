import { useNavigate } from "react-router-dom";
import asset from "../assets/Asset";
import { IoPersonAddOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import UsersList from "./UsersList";
import { jwtDecode } from "jwt-decode";

const Admin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  return (
    <div>
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
      <div className="flex justify-end items-center mr-3">
        <div
          onClick={() => navigate("/admin/register")}
          className="w-fit cursor-pointer bg-gradient-to-br from-blue-950 via-blue-700 to-black rounded-2xl py-0 my-2 px-2 text-white hover:from-black hover:via-blue-800 text-shadow-2xs"
        >
          <p className="font-bold flex justify-center items-center gap-2">
            Create account <IoPersonAddOutline />
          </p>
        </div>
      </div>
      <h2 className="font-bold text-2xl text-center py-4">Accounts list</h2>
      <UsersList />
    </div>
  );
};

export default Admin;
