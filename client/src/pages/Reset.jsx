import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate';

import styles from '../styles/Usuario.module.css';
import { useAuthStore } from '../store/store';
import useFetch from '../hooks/fetch.hook';
import { Loader } from '../components';
import { resetPassword } from '../helper/helper';

export default function Reset() {
  
  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')

  const formik = useFormik({
    initialValues : {
      password : '',
      confirm_pwd: ''
    },
    validate : resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Atualizando...',
        success: <b>Resetada com sucesso...!</b>,
        error : <b>Não foi possível reseta-la!</b>
      });

      resetPromise.then(function(){ navigate('/senha') })

    }
  })

  if(isLoading) return <div className="flex justify-center items-center pt-60"><Loader/></div>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/senha'} replace={true}></Navigate>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width : "50%"}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Resetar</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Entre uma nova senha.
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Nova senha' />
                  <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Repita a senha' />
                  <button className={styles.btn} type='submit'>Resetar</button>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}