import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/perfil.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";

import styles from "../styles/Usuario.module.css";

export default function Usuario() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/senha");
    },
  });

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center">
          <div className="bg-black bg-opacity-40 border-indigo-600 border-2 backdrop-blur-lg rounded-md drop-shadow-lg h-[38rem] mt-[5rem] w-[36rem]">
            <div className="title flex flex-col items-center mt-[5rem]">
              <h4
                className="font-extrabold text-indigo-600
        text-5xl"
              >
                Olá de novo!
              </h4>
              <div className="text-center py-4">
                <span className="text-white">
                  Não é um membro?{" "}
                  <Link
                    className="text-[#8250e6] cursor-pointer"
                    to="/registro"
                  >
                    Cadastre-se
                  </Link>
                </span>
              </div>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <div className="border-solid border-indigo-600 border-4 rounded-full">
                  <img
                    src={avatar}
                    className="w-[10rem] h-[10rem] lg:w-[135px] lg:h-[135px] rounded-full items-center"
                    alt="avatar"
                  />
                </div>
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="w-[20rem]">
                  <input
                    {...formik.getFieldProps("username")}
                    className="bg-gray-50 mt-[4.5rem] border-2 border-indigo-600 text-[#8250e6] text-sm rounded-lg outline-none block w-full p-3"
                    type="text"
                    placeholder="Usuário"
                  />
                </div>
                <button
                  className="w-[10rem] text-white bg-indigo-600 hover:bg-[#8250e6] font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
                  type="submit"
                >
                  Vamos lá
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
