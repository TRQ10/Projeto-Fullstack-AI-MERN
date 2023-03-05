import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/perfil.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate';

import styles from '../styles/Usuario.module.css';

export default function Reset() {
  
    const formik = useFormik({
      initialValues : {
        password : '',
        confirm_pwd: ''
      },
      validate : resetPasswordValidation,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
        console.log(values);
      }
    })
  
    return (
      <div className="container mx-auto">
  
        <Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center'>
          <div className={styles.glass} style={{width: '50%'}}>
  
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Resetar</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Digite a sua nova senha.
              </span>
            </div>
  
            <form className='py-20' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                    <img src={avatar} className={styles.profile_img} alt="avatar" />
                </div>
  
                <div className="textbox flex flex-col items-center gap-6">

                    <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Nova senha' />
                    <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="password" placeholder='Confirme a nova senha' />

                    <button className={styles.btn} type='submit'>Resetar</button>
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