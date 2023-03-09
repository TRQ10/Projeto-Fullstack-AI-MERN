import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/perfil.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';

import styles from '../styles/Usuario.module.css';

export default function Usuario() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

    const formik = useFormik({
      initialValues : {
        username : 'example123'
      },
      validate : usernameValidate,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
        setUsername(values.username);
        navigate('/senha')
      }
    })
  
    return (
      <div className="container mx-auto">
  
        <Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center'>
          <div className={styles.glass} style={{ width: '45%'}}>
  
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
                    <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Usuário' />
                    <button className={styles.btn} type='submit'>Vamos lá</button>
                </div>
  
                <div className="text-center py-4">
                  <span className='text-gray-500'>Não é um membro? <Link className='text-red-500' to="/registro">Cadastre-se</Link></span>
                </div>
  
            </form>
  
          </div>
        </div>
      </div>
    )
  }