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


  const navigate = useNavigate()
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
      let registerPromise = regiterUser(values)
      toast.promise(registerPromise, {
        loading: "Criando...",
        success: <b>Registrado com Sucesso...!</b>,
        error : <b>Não foi possível registrar</b>
      });

      registerPromise.then(function(){ navigate('/usuario') })
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
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center">
        <div className={styles.glass} style={{ width: "45%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Cadastro</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Estamos felizes por te ter aqui!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>

              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Usuário*"
              />
             <div className="relative">
                <div className="absolute flex right-4 justify-center items-center ml-2 h-full">
                  <button onClick={togglePassword} type="button">
                    {" "}
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.textbox}
                  type={passwordShown ? "text" : "password"}
                  placeholder="Senha"
                />
              </div>
              <button className={styles.btn} type="submit">
                Cadastrar
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Já é cadastrado?{" "}
                <Link className="text-red-500" to="/usuario">
                  Entrar
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
