import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/perfil.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';

import styles from '../styles/Usuario.module.css';

export default function Recuperação() {
  
    const formik = useFormik({
      initialValues : {
        password : ''
      },
      validate : passwordValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
        console.log(values);
      }
    })
  
    return (
      <div className="container mx-auto">
  
        <Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center h-screen'>
          <div className={styles.glass}>
  
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Recuperar a senha</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Insira o código
              </span>
            </div>
  
            <form className='pt-20' onSubmit={formik.handleSubmit}>
    
  
                <div className="textbox flex flex-col items-center gap-6">
                    
                    <div className='input text-center'>
                      <span className='py-4 text-sm text-left text-gray-500'>
                        Insira o código de 7 dígitos que foi enviado para o seu e-mail.
                      </span>
                      <input className={styles.textbox} type="number" placeholder='Código' />
                      </div>
                      <button className={styles.btn} type='submit'>Entrar</button>
                </div>
  
                <div className="text-center py-4">
                  <span className='text-gray-500'>Não recebeu o código? <button className='text-red-500'>Reenviar</button></span>
                </div>
  
            </form>
  
          </div>
        </div>
      </div>
    )
  }