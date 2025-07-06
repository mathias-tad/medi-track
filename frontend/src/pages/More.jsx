import { Link, useNavigate } from "react-router-dom";
import asset from "../assets/Asset";
import { CiLogin } from "react-icons/ci";

function More() {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="flex justify-between items-center h-16 w-full px-10 py-4">
        <div className="h-full cursor-pointer" onClick={() => navigate("/")}>
          <img className="h-full" src={asset.logo} alt="" />
        </div>
        <div
          onClick={() => navigate("/login")}
          className="flex justify-center items-center gap-2 cursor-pointer bg-gradient-to-br from-blue-950 via-blue-700 to-black rounded-2xl py-0 my-2 px-2 text-white hover:from-black hover:via-blue-800 text-shadow-2xs"
        >
          <p className="font-bold">Login</p>
          <CiLogin />
        </div>
      </nav>
      <div className="p-7">
        <h3 className="pb-3 text-center">
          This app is under development and this is a demo version so, if you
          don't got is as expected feel free to send a feedback to
          mathiastadesse@gmail.com
        </h3>
        <p className="pb-3">
          The app is designed to make activities in the hospital digitalize and
          make all communications easy. It makes patient registration and
          patients data handdeling easy.
        </p>
        <p className="pb-3">
          In this App there are 5 kinds of accounts to login
        </p>
        <ol className="list-decimal pl-14">
          <li className="my-2">
            <span className="font-bold">Admin account</span>
            <p>
              This account is for the admin of the hospital and the admin will
              be the only person to create any other accounts. The admin is
              subjected to any account related things creating, reading,
              updating and archieving any of other accounts. If you want to try
              the app as an Admin use
            </p>
            <ul className="list-disc pl-7">
              <li>
                <span className="font-bold">username:</span> math
              </li>
              <li>
                <span className="font-bold">password:</span> 123456
              </li>
            </ul>
          </li>
          <li className="my-2">
            <span className="font-bold">Registration account</span>
            <p>
              This is an account for the one who are on the front desk at the
              hospital. This account can create or register a new patient,
              search for registered patient and send the case to the conserned
              party but can not see any patient histories writen by doctors and
              lab technitians. You want to try this account? use{" "}
            </p>
            <ul className="list-disc pl-7">
              <li>
                <span className="font-bold">username:</span> sarah
              </li>
              <li>
                <span className="font-bold">password:</span> 123456
              </li>
            </ul>
          </li>
          <li className="my-2">
            <span className="font-bold">Doctors account</span>
            <p>
              This is an account for doctors and Doctors can see patients
              assigned to them and can write and read patient history and their
              name and time stamp would be visible under the history they wrote.
              Doctors also can send lab requests to the lab technitians and see
              the lab results use the following account to try it as a doctor
            </p>
            <ul className="list-disc pl-7">
              <li>
                <span className="font-bold">username:</span> jhon
              </li>
              <li>
                <span className="font-bold">password:</span> 123456
              </li>
            </ul>
          </li>
          <li className="my-2">
            <span className="font-bold">Finance account</span>
            <p>
              This is an account for finance department and this account only
              shows whether the patient pays his/her fee and when doctors send a
              lab request the request first come to this department and after
              the patient payed the asked price it will be forwarded to the lab.
              Try this account with{" "}
            </p>
            <ul className="list-disc pl-7">
              <li>
                <span className="font-bold">username:</span> bob
              </li>
              <li>
                <span className="font-bold">password:</span> 123456
              </li>
            </ul>
          </li>
          <li className="my-2">
            <span className="font-bold">Nurses account</span>
            <p>
              This account can only read patient status but can write nothing
              use{" "}
            </p>
            <ul className="list-disc pl-7">
              <li>
                <span className="font-bold">username:</span> zebider
              </li>
              <li>
                <span className="font-bold">password:</span> 123456{" "}
                <p>for your try.</p>
              </li>
            </ul>
          </li>
          <li className="my-2">
            <span className="font-bold">Finance account</span>
            <p>
              This account can see unpaid bills and can update unpaid status to
              paid
            </p>
            <ul className="list-disc pl-7">
              <li>
                <span className="font-bold">username:</span> smith
              </li>
              <li>
                <span className="font-bold">password:</span> 123456
              </li>
            </ul>
          </li>
        </ol>
        <p className="mb-2">
          <span className="font-bold">NB:</span> This app is not mobile friendly
          as it needs a wider screen.
        </p>
        <p>
          Have fun with my app and send me a{" "}
          <Link
            to={"mailto:mathiastadesse@gmail.com"}
            className="text-blue-700 hover:border-b-2"
          >
            feedback
          </Link>
        </p>
        <p>Thank you!</p>
      </div>
    </div>
  );
}

export default More;
