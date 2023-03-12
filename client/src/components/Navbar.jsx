import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import avatar from "../assets/perfil.png";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import styles from '../styles/Usuario.module.css';
import extend from '../styles/Profile.module.css';


export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // logout handler function
  function userLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // set to false when logging out
    navigate("/");
  }

  // use effect to check if the token exists and if exists re render the navbar to show different buttons
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <header className="w-full sticky top-0 z-30 flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>

      <div className="flex gap-2.5 item-center">
        {isLoggedIn ? (
          <>
            <button
              className="font-inter text-sm bg-[#ff6464] text-white px-4 py-2 rounded-md"
              to="/"
              onClick={userLogout}>
              Logout
            </button>
            <Link
              to="/create-post"
              className="font-inter text-sm bg-[#6469ff] text-white px-4 py-2 rounded-md flex justify-center items-center">
              Create
            </Link>
            <Link to="/perfil">
              <div className="w-10 h-10 rounded-full">
                  <img
                    src={apiData?.profile ||  avatar}
                    className={`${styles.profile_img} ${extend.profile_img}`}
                    alt="avatar"
                  />
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/usuario"
              className="font-inter font-medium bg-[#ff6464] text-white px-4 py-2 rounded-md">
              Login
            </Link>
            <Link
              to="/registro"
              className="font-inter font-medium bg-[#ff6464] text-white px-4 py-2 rounded-md">
              Cadastro
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
