import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Modal from "react-modal";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { VscSaveAs } from "react-icons/vsc";
import { CiUser } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const [isVisible, setIsVisible] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    position: "",
  });

  useEffect(() => {
    axios
      .get(`${serverAddress}/api/user/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data));
  }, []);

  const changeHandeler = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    try {
      await axios.put(
        `${serverAddress}/api/user/admin/update-user/${userId}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsEditOpen(false);
      setEditData({ username: "", email: "", position: "" });
      toast.success("User Updated");
      await axios
        .get(`${serverAddress}/api/user/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsers(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-3">
        {users.length > 0 && (
          <p className="font-bold m-3">{users.length} User acounts total</p>
        )}
        {!users && <p>No users found</p>}
        {users.length > 0 && (
          <div>
            <p className="font-bold">Filter by</p>
            <select
              className="outline-none"
              defaultValue={"all"}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="doctor">Doctors</option>
              <option value="nurse">Nurses</option>
              <option value="finance">Finances</option>
              <option value="labtech">Labtechs</option>
              <option value="reg">Registration</option>
            </select>
          </div>
        )}
      </div>
      {filter == "all" &&
        users.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              setIsVisible((prev) => (prev === user._id ? null : user._id));
            }}
            className="flex justify-between items-center px-3 bg-gradient-to-r from-transparent via-gray-50 to-transparent shadow-2xs shadow-black mb-2 mx-3 py-2 rounded-2xl hover:bg-gradient-to-r hover:from-transparent hover:via-blue-50 hover:to-transparent"
          >
            <span>{user.username}</span>
            {isVisible === user._id && (
              <div>
                <p>Email: {user.email}</p>
                <p>Position: {user.position}</p>
              </div>
            )}
            <div className="flex gap-3">
              <MdEdit
                onClick={() => {
                  setIsEditOpen(true);
                  setIsVisible(null);
                  setUserId(user._id);
                  setEditData({
                    username: user.username,
                    email: user.email,
                    position: user.position,
                  });
                  setUserId(user._id);
                }}
                className="hover:text-green-500"
              />
              <MdDelete
                onClick={() => {
                  setIsModalOpen(true);
                  setIsVisible(null);
                  setUserId(user._id);
                }}
                className="hover:text-red-500"
              />
            </div>
          </div>
        ))}
      {filter != "all" &&
        users.map(
          (user) =>
            user.position == filter && (
              <div
                key={user._id}
                onClick={() => {
                  setIsVisible((prev) => (prev === user._id ? null : user._id));
                }}
                className="flex justify-between items-center px-3 bg-gradient-to-r from-transparent via-gray-50 to-transparent shadow-2xs shadow-black mb-2 mx-3 py-2 rounded-2xl hover:bg-gradient-to-r hover:from-transparent hover:via-blue-50 hover:to-transparent"
              >
                <span>{user.username}</span>
                {isVisible === user._id && (
                  <div>
                    <p>Email: {user.email}</p>
                    <p>Position: {user.position}</p>
                  </div>
                )}
                <div className="flex gap-3">
                  <MdEdit
                    onClick={() => {
                      setIsEditOpen(true);
                      setIsVisible(null);
                      setUserId(user._id);
                      setEditData({
                        username: user.username,
                        email: user.email,
                        position: user.position,
                      });
                      setUserId(user._id);
                    }}
                    className="hover:text-green-500"
                  />
                  <MdDelete
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsVisible(null);
                      setUserId(user._id);
                    }}
                    className="hover:text-red-500"
                  />
                </div>
              </div>
            )
        )}
      {/**Delete Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className={
          "w-fit h-fit m-auto bg-gradient-to-r from-gray-100 to-gray-200 p-7 rounded-2xl shadow-2xl shadow-blue-950 relative top-40"
        }
      >
        <div>
          <h2 className="text-center text-2xl text-red-500">
            Are you sure you want to delete this account?
          </h2>
          <p className="text-center text-red-500 mb-5">
            Account deletion are e-reversible
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex justify-center items-center cursor-pointer text-green-600 px-2 rounded-2xl hover:bg-gradient-to-r hover:from-transparent hover:via-gray-300 hover:to-transparent"
            >
              Cancel <MdCancel />
            </button>
            <button
              onClick={async () => {
                try {
                  await axios.delete(
                    `${serverAddress}/api/user/admin/delete/${userId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  toast.success("User Deleted");
                  setIsModalOpen(false);

                  axios
                    .get(`${serverAddress}/api/user/admin`, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((res) => setUsers(res.data));
                } catch (error) {
                  console.log(error);
                }
              }}
              className="flex justify-center items-center cursor-pointer text-red-600 px-2 rounded-2xl hover:bg-gradient-to-r hover:from-transparent hover:via-gray-300 hover:to-transparent"
            >
              Delete <MdDelete />
            </button>
          </div>
        </div>
      </Modal>
      {/**Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="w-fit p-20 mx-auto bg-amber-50 shadow-2xl rounded-2xl mt-10"
      >
        <div className="w-fit">
          <div>
            <form className="w-fit h-fit mx-auto" onSubmit={submitHandler}>
              <h1 className="mb-4 text-2xl text-center font-bold">Edit User</h1>
              <div className="flex justify-center items-center mb-2">
                <CiUser />
                <input
                  className="outline-none pl-3 mb-2 border-b-2"
                  name="username"
                  type="text"
                  value={editData.username}
                  required
                  placeholder="Username"
                  onChange={changeHandeler}
                />
              </div>

              <div className="flex justify-center items-center mb-2">
                <MdOutlineMailOutline />
                <input
                  className="outline-none pl-3 mb-2 border-b-2"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={editData.email}
                  required
                  onChange={changeHandeler}
                />
              </div>
              <div>
                <select
                  className="outline-none mb-2 border-b-2 w-full"
                  name="position"
                  value={editData.position}
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
              </div>

              <div className="flex justify-center my-3">
                <button
                  className="border-2 bg-gradient-to-r from-blue-800 to-blue-950 text-white rounded-full px-6 mt-4 cursor-pointer font-bold flex justify-center items-center gap-3 hover:bg-gradient-to-br hover:from-green-600 hover:to-green-300"
                  type="submit"
                >
                  <VscSaveAs /> Save
                </button>
              </div>
              <div
                onClick={() => setIsEditOpen(false)}
                className="flex justify-center items-center gap-3 cursor-pointer hover:bg-gradient-to-br hover:from-red-600 hover:to-red-300 rounded-full px-6 mt-4 font-bold w-fit mx-auto"
              >
                <MdCancel /> Cancel
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UsersList;
