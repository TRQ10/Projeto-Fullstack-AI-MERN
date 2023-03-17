import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import avatar from "../assets/perfil.png";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { daisy } from "../assets";

export const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { username } = useAuthStore((state) => state.auth);
  const [{ apiData }] = useFetch(`user/${username}`);
  const [profilePicture, setProfilePicture] = useState();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // logout handler function
  function userLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("username");
    setIsLoggedIn(false); // set to false when logging out
    navigate("/");
  }

  // use effect to check if the token exists and if exists re render the navbar to show different buttons
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  // After fetching the user data, update the username in local storage and state
  useEffect(() => {
    if (apiData?.username) {
      localStorage.setItem("username", apiData.username);
    }
  }, [apiData]);

   // Load the username from local storage on mount
   useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setProfilePicture(storedUsername);
    }
  }, []);


  // After fetching the user data, update the profile picture URL in local storage and state
  useEffect(() => {
    if (apiData?.profile) {
      localStorage.setItem("profilePicture", apiData.profile);
      setProfilePicture(apiData.profile);
    }
  }, [apiData]);

  // Load the profile picture URL from local storage on mount
  useEffect(() => {
    const storedProfilePicture = localStorage.getItem("profilePicture");
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }
  }, []);

  return (
    <header className="w-full sticky top-0 z-30 flex justify-between items-center bg-black border-b border-indigo-600 sm:px-8 px-4 py-4 backdrop-filter backdrop-blur-lg bg-opacity-40">
      <Link to="/">
        <img src={daisy} alt="logo" className="w-10 object-contain" />
      </Link>

      <div className="flex gap-2.5 item-center">
        {isLoggedIn ? (
          <>
            <button
              className="text-sm text-white px-4 py-2 rounded-md hover:text-[#8250e6]"
              to="/"
              onClick={userLogout}
            >
              Logout
            </button>
            <Link
              to="/create-post"
              className="text-white bg-indigo-600 hover:bg-[#8250e6] font-medium mt-[5px] rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
            >
              Create
            </Link>
            <Link to="/perfil">
              <div className="rounded-full border-indigo-600 border-4">
                <img
                  src={profilePicture || avatar}
                  className="rounded-full h-[38px] w-[38px]"
                  alt="avatar"
                />
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/usuario"
              className="font-medium text-white px-4 py-2 rounded-md hover:text-[#8250e6]"
            >
              Login
            </Link>
            <Link
              to="/registro"
              className="text-white bg-[#442485] hover:bg-[#8250e6] font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
            >
              Cadastro
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
