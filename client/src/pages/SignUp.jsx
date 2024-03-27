import {
  UilUser,
  UilEnvelope,
  UilKeySkeleton,
  UilEye,
} from "@iconscout/react-unicons";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // const { setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // const loginWithGoogle = () => {
  //   authWithGoogle()
  //     .then(async (user) => {
  //       const { data } = await axios.post(
  //         `${import.meta.env.VITE_BASE_URL}/google-auth`,
  //         user
  //       );
  //       toast.success(`Welcome ${data.fullname}`);
  //       storeInSession("user", JSON.stringify(data));
  //       setUserAuth(data);
  //       navigate("/");
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong");
  //     });
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
        fullname,
        email,
        password,
      })
      .then(({ data }) => {
        toast.success("Thank you for Signing Up");
        navigate("/signin");
      })
      .catch(({ response }) => toast.error(response.data.error));
  };

  return (
    <div className="text-white flex justify-center items-center h-[calc(100vh-89px)]">
      <div className="flex flex-col gap-8 justify-center items-center w-full">
        <h1 className="font-hedwig text-4xl md:text-6xl">Join Artico</h1>
        <form className="flex flex-col gap-6 md:p-10 rounded-xl w-[90%] max-w-[500px]">
          <div className="relative w-full">
            <UilUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="px-10 py-4 bg-stone-800 rounded-xl outline-none w-full"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="relative w-full">
            <UilEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              required
              className="px-10 py-4 bg-stone-800 rounded-xl outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative w-full">
            <UilKeySkeleton className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              className="px-10 py-4 bg-stone-800 rounded-xl outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <UilEye
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
              onClick={handlePasswordVisibility}
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black font-bold p-3 rounded-xl"
            onClick={handleFormSubmit}
          >
            Sign Up
          </button>
        </form>
        <div className="text-white md:px-10 flex flex-col items-center gap-4 w-[90%] max-w-[500px]">
          <span>OR</span>
          {/* <div
            className="bg-stone-800 p-4 rounded-xl flex gap-4 items-center justify-center w-full cursor-pointer"
            onClick={loginWithGoogle}
          >
            <img src={google} alt="google logo" className="w-6 h-6" />
            <span className="text-xl">Continue with google</span>
          </div> */}
          <div>
            <span>Already have an account?</span>
            <Link to="/signin" className="underline ml-2">
              Sign In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
