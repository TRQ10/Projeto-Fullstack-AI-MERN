import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/perfil.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';

import styles from '../styles/Usuario.module.css';

export default function Senha() {
  
    const formik = useFormik({
      initialValues : {
        password : 'exemplo@123'
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
              <h4 className='text-5xl font-bold'>Olá de novo!</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Explore mais se conectando com a gente.
              </span>
            </div>
  
            <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                    <img src={avatar} className={styles.profile_img} alt="avatar" />
                </div>
  
                <div className="textbox flex flex-col items-center gap-6">
                    <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Senha' />
                    <button className={styles.btn} type='submit'>Entrar</button>
                </div>
  
                <div className="text-center py-4">
                  <span className='text-gray-500'>Esqueceu a senha? <Link className='text-red-500' to="/recuperacao">Recuperar agora</Link></span>
                </div>
  
            </form>
  
          </div>
        </div>
      </div>
    )
  }