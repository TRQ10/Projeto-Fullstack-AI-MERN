import React from "react";
import { logo } from "../assets";

function Footer() {
  return (
    <>
      <footer className="p-4 rounded-lg md:px-6 md:py-8 lg:ml-[10rem] lg:w-[100rem]">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <img className="w-[6rem]" src={logo} alt="" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white"></span>
          </div>
          <div className="flex flex-row gap-4">
            <div className="h-10 w-10 border items-center justify-center flex border-indigo-600 rounded-full">
              <p className="text-white hover:text-indigo-600 text-[15px]">
                <i className="bx bxl-discord-alt"></i>
              </p>
            </div>

            <div className="h-10 w-10 border items-center justify-center flex border-indigo-600 rounded-full">
              <p className="text-white hover:text-indigo-600">
                <i className="bx bxl-github"></i>
              </p>
            </div>

            <div className="h-10 w-10 border items-center justify-center flex border-indigo-600 rounded-full">
              <p className="text-white hover:text-indigo-600">
                <i className="bx bxl-twitter"></i>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-6 border-indigo-600 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center text-white">
          © <span className="hover:underline">dAIsy</span>. Todos os direitos
          reservados.
        </span>
      </footer>
    </>
  );
}

export default Footer;
