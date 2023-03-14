import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/perfil.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../helper/helper";

import styles from "../styles/Usuario.module.css";
import { Loader } from "../components";

export default function Senha() {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Logado Com Sucesso...!</b>,
        error: <b>A Senha não bate...</b>,
      });

      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/");
      });
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center pt-60">
        <Loader />
      </div>
    );
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center">
        <div className="bg-black bg-opacity-40 border-indigo-600 border-2 backdrop-blur-lg rounded-md drop-shadow-lg h-[40rem] mt-[5rem] w-[36rem]">
          <div className="title flex flex-col items-center">
            <h4
              className="font-extrabold text-[#8544ff]
        text-4xl mt-5"
            >
              Olá de novo{" "}
              <span className="capitalize">
                {apiData?.firstName || apiData?.username}
              </span>
              !
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-white">
              É ótimo ver você aqui de novo! Entre na sua conta e crie novas
              imagens incríveis.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4">
              <div className="border-solid border-indigo-600 border-4 rounded-full">
                <img
                  src={apiData?.profile || avatar}
                  className="rounded-full lg:w-[15rem] lg:h-[15rem] w-[10rem] h-[10rem] mx-0 my-0"
                  alt="avatar"
                />
              </div>
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="relative">
                <div className="absolute flex right-4 justify-center items-center ml-2 h-full z-30">
                  <button onClick={togglePassword} type="button">
                    {" "}
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="lg:w-[25rem] w-[14.5rem]">
                  <input
                    {...formik.getFieldProps("password")}
                    className="border-2 border-indigo-600 text-[#8544ff] text-sm rounded-lg outline-none block w-full p-3"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Senha"
                  />
                </div>
              </div>

              <button
                className="text-white bg-indigo-600 hover:bg-[#8250e6] font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
                type="submit"
              >
                Entrar
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-white">
                Esqueceu a senha?{" "}
                <Link className="text-[#8250e6]" to="/recuperacao">
                  Recuperar agora
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
