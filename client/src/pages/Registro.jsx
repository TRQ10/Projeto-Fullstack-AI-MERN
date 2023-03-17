import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/perfil.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";

import styles from "../styles/Usuario.module.css";
import { regiterUser } from "../helper/helper";

export default function Registro() {
  const [file, setFile] = useState();
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      let registerPromise = regiterUser(values);
      toast.promise(registerPromise, {
        loading: "Criando...",
        success: <b>Registrado com Sucesso...!</b>,
        error: <b>Não foi possível registrar</b>,
      });

      registerPromise.then(function () {
        navigate("/usuario");
      });
    },
  });

  /** formik não aguenta o upload de arquivos, então é necessário criar essa funcionalidade */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center">
          <div class="bg-black bg-opacity-40 border-indigo-600 border-2 backdrop-blur-lg rounded-md drop-shadow-lg h-[38rem] mt-[5rem] w-[36rem]">
            <div className="mb-6 lg:mb-0">
              <div className="title flex flex-col items-center">
                <h4
                  className="font-extrabold text-indigo-600
        text-5xl mt-10"
                >
                  Cadastro
                </h4>
                <div className="text-center py-4">
                  <span className="text-white">
                    Já é cadastrado?{" "}
                    <Link className="text-[#8250e6]" to="/usuario">
                      Entrar
                    </Link>
                  </span>
                </div>
              </div>

              <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="profile flex justify-center py-4">
                  <label htmlFor="profile">
                    <div className="border-solid border-indigo-600 border-4 rounded-full">
                      <img
                        src={file || avatar}
                        className="w-[10rem] h-[10rem] lg:w-[135px] lg:h-[135px] rounded-full items-center"
                        alt="avatar"
                      />
                    </div>
                  </label>

                  <input
                    onChange={onUpload}
                    type="file"
                    id="profile"
                    name="profile"
                  />
                </div>

                <div className="textbox flex flex-col items-center gap-6">
                  <div className="w-[20rem]">
                    <input
                      {...formik.getFieldProps("email")}
                      className="bg-gray-50 border-2 border-indigo-600 text-[#8544ff] text-sm rounded-lg outline-none block w-full p-3"
                      type="text"

                      placeholder="Email"

                    />
                  </div>

                  <div className="w-[20rem]">
                    <input
                      {...formik.getFieldProps("username")}
                      className="bg-gray-50 border-2 border-indigo-600 text-[#8544ff] text-sm rounded-lg outline-none block w-full p-3"
                      type="text"

                      placeholder="Usuário"

                    />
                  </div>
                  <div className="relative">
                    <div className="absolute flex right-4 justify-center items-center ml-2 h-full">
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
                    <div className="w-[20rem]">
                      <input
                        {...formik.getFieldProps("password")}
                        className="bg-gray-50 border-2 border-indigo-600 text-[#8544ff] text-sm rounded-lg outline-none block w-full p-3"
                        type={passwordShown ? "text" : "password"}
                        placeholder="Senha"
                      />
                    </div>
                  </div>
                  <button
                    className="w-[10rem] lg:mt-0 mt-[-11px] text-white bg-indigo-600 hover:bg-[#8250e6] font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
                    type="submit"
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
