import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../config/features/auth/loginSlice";
import toast, { Toaster } from "react-hot-toast";
import { logo } from "../../assets/image";

const Login = () => {
  const [loading, setLoading] = useState();
  const [login, setLogin] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const createLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await dispatch(postLogin(login));

        return response;
      } catch (error) {
        console.log("Kesalahan login:", error);
      } finally {
        setLoading(false);
        navigate("/");
      }
    },
    [dispatch, navigate, login]
  );
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      toast.success("Kamu sudah login!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate]);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster
          position="center-top"
          reverseOrder={false}
          containerClassName=""
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-36 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={createLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/reset-password">
                    <div className="font-semibold text-gray-900 hover:text-indigo-500">
                      Forgot password?
                    </div>
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {loading && <p>loading ...</p>}
              <button className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                Sign in
              </button>
            </div>
            <div className="text-sm">
              <Link to="/register">
                <div className="font-semibold text-gray-900 hover:text-indigo-500">
                  Daftar dulu :D
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
