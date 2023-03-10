import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/perfil.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';

import styles from '../styles/Usuario.module.css';
import extend from '../styles/Profile.module.css';


export default function Perfil() {

   const [file, setFile] = useState() 
  
    const formik = useFormik({
      initialValues : {
        firstName: '',
        lastName: '',
        email: '',
      },
      validate : profileValidation,
      validateOnBlur: false,
      validateOnChange: false,
      onSubmit : async values => {
        values = await Object.assign(values, {profile : file || ''})
        console.log(values);
      }
    })

    /** formik não aguenta o upload de arquivos, então é necessário criar essa funcionalidade */
    const onUpload = async e => {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    }

    return (
      <div className="container mx-auto">
  
        <Toaster position='top-center' reverseOrder={false}></Toaster>
  
        <div className='flex justify-center items-center'>
          <div className={`${styles.glass} ${extend.glass}`} style={{ width: '45%'}}>
  
            <div className="title flex flex-col items-center">
              <h4 className='text-5xl font-bold'>Perfil</h4>
              <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Atualize seu perfil
              </span>
            </div>
  
            <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                    <label htmlFor='profile'>
                      <img src={file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                    </label>

                    <input onChange={onUpload} type='file' id='profile' name='profile' />
                </div>
  
                <div className="textbox flex flex-col flex-wrap items-center gap-6">
                    <div className='name flex flex-col w-3/4 gap-10'>
                      <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Nome' />
                      <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Sobrenome' />
                      <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email' />

                    </div>


                      <button className={styles.btn} type='submit'>Editar perfil</button>
                    

                  
                </div>
  
                <div className="text-center py-4">
                  <span className='text-gray-500'>Voltar depois? <Link className='text-red-500' to="/usuario">Sair</Link></span>
                </div>
  
            </form>
  
          </div>
        </div>
      </div>
    )
  }