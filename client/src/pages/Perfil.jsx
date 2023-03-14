import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/perfil.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { useAuthStore } from "../store/store";
import useFetch from "../hooks/fetch.hook";
import { useNavigate } from "react-router-dom";

import styles from "../styles/Usuario.module.css";
import extend from "../styles/Profile.module.css";
import { updateUser } from "../helper/helper";
import { Loader } from "../components";

export default function Perfil() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Atualizando...",
        success: <b>Atulizado com sucesso...!</b>,
        error: <b>Não foi possivel atualizar!</b>,
      });

      console.log(values);
    },
  });

  /** formik não aguenta o upload de arquivos, então é necessário criar essa funcionalidade */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center pt-60">
        <Loader />
      </div>
    );
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="flex flex-col">
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center">
          <div className="bg-black bg-opacity-40 border-indigo-600 border-2 backdrop-blur-lg rounded-md drop-shadow-lg h-[38rem] mt-[5rem] w-[36rem]">
            <div className="title flex flex-col items-center">
              <h4
                className="font-extrabold text-[#8544ff]
        lg:text-4xl mt-5 tracking-thigh text-3xl"
              >
                Configurações de perfil
              </h4>
              <span className="py-4 text-xl w-2/3 text-center text-white">
                Atualize seu perfil
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  <div className="border-solid border-purple-500 border-4 rounded-full">
                    <img
                      src={apiData?.profile || file || avatar}
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

              <div className="textbox flex flex-col justify-center items-center gap-6">
                <div className="name flex justify-center flex-col w-full gap-10">
                  <div className="w-[20rem] ml-[2.5rem] lg:ml-[8.5rem]">
                    <input
                      {...formik.getFieldProps("firstName")}
                      className="bg-gray-50 border-2 border-[#9872e4] text-[#8544ff] text-sm rounded-lg outline-none block w-full p-3"
                      type="text"
                      placeholder="Nome"
                    />
                  </div>
                  <div className="w-[20rem] ml-[2.5rem] lg:ml-[8.5rem]">
                    <input
                      {...formik.getFieldProps("lastName")}
                      className="bg-gray-50 border-2 border-[#9872e4] text-[#8544ff] text-sm rounded-lg outline-none block w-full p-3"
                      type="text"
                      placeholder="Sobrenome"
                    />
                  </div>
                  <div className="w-[20rem] ml-[2.5rem] lg:ml-[8.5rem]">
                    <input
                      {...formik.getFieldProps("email")}
                      className="bg-gray-50 border-2 border-[#9872e4] text-[#8544ff] text-sm rounded-lg outline-none block w-full p-3"
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <button
                  className="text-white mt-[-15px] lg:mt-0 bg-[#8250e6] hover:bg-[#af93d7] font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
                  type="submit"
                >
                  Editar perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
