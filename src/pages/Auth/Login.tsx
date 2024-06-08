import { useState } from "react";
import { useDispatch } from "../../redux/store";
import { loginUser } from "../../redux/actions/app";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
    } catch (error) {
      toast.error(error as any);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen ">
      <div className="w-full max-w-md p-2 space-y-8 border-2 rounded-lg md:p-10 border-carrot bg-gray-50">
        <div>
          <h2 className="mt-6 text-lg font-extrabold text-center text-gray-700 md:text-2xl">
            Login To Your Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 -space-y-px rounded-md shadow-sm">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleEmailChange}
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex justify-center ">
            <button
              type="submit"
              className="relative w-1/2 px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-carrot group hover:bg-carrot-100 "
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
