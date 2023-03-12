import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/perfil.png";
import { toast, Toaster } from "react-hot-toast";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useAuthStore } from "../store/store";

import styles from "../styles/Profile.module.css";

export default function Recuperação() {
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if(OTP) return toast.success('Código foi enviado para o seu email!');
      return toast.error('Houve um problema na geração do código!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verificado com sucesso!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Código errado! Por favor verifique seu email novamente!')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Enviando...',
        success: <b>Código foi enviado para o seu email!</b>,
        error: <b>Não foi possível enviar o código!</b>,
      }
    );

    sentPromise.then((OTP) => {
    });
    
  }

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recuperação</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Entre o código para recuperar a senha.
            </span>
          </div>

          <form className='pt-20' onSubmit={onSubmit}>

              <div className="textbox flex flex-col items-center gap-6">

                  <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-500'>
                      Entre o código de 7 digitos enviado para o seu email.
                    </span>
                    <input onChange={(e) => setOTP(e.target.value) } className={styles.textbox} type="text" placeholder='Código' />
                  </div>

                  <button className={styles.btn} type='submit'>Recuperar</button>
              </div>
          </form>

          <div className="text-center py-4">
            <span className='text-gray-500'>Não recebeu o código? <button onClick={resendOTP} className='text-red-500'>Reenviar</button></span>
          </div>

        </div>
      </div>
    </div>
  )
}