import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postRegister } from "../../config/features/auth/registerSlice";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../assets/image";

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const createAccount = useCallback(
    async (e) => {
      e.preventDefault(e);
      setLoading(true);
      await dispatch(postRegister({ account }));
      console.log("account in page register", account);

      if (createAccount) {
        navigate("/");
      } else {
        console.log("Register failed");
      }
    },
    [dispatch, navigate, account]
  );
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      alert("sudah login bang");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-60 w-auto mt-10"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register for create account!
          </h2>
        </div>
        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={createAccount}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nama Lengkap
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="full_name"
                  type="text"
                  value={account.full_name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select Role
              </label>
              <select
                id="role"
                value={account.role}
                name="role"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={account.role}>Choose u role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
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
                  type="email"
                  value={account.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={account.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {loading && <p>Loading...</p>}
              <button className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
            <div className="text-sm">
              <Link to="/login">
                <div className="font-semibold text-gray-900 hover:text-indigo-500">
                  I have account :D
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
