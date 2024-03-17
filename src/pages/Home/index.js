import { useNavigate } from "react-router-dom";
import { Navbar, Products } from "../../components";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <div>
              <h2>search ..</h2>
            </div>
          </div>
        </header>
        <main>
          <div className="grid grid-flow-col bg-gray-100 justify-stretch max-w py-6 sm:px-6 lg:px-8">
            <Products />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
