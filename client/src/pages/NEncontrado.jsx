import React from 'react'
import { error } from "../assets";


export default function NEncontrado() {
  return (
    <div div className='flex justify-center items-center'>
      <div className='flex justify-center items-center flex-col gap-10 py-5'>
      <div className='text-center py-8 text-white	'>
      <p className='md:text-lg sm:text-5xl font-semibold'>Opa...</p>
      <p className='md:text-xl sm:text-sm'>A página que você está procurando pode ter sido movida, deletada ou nunca existiu.</p>
      </div>
      <img src={error} alt="error" className='lg:w-2/3 md:w-full h-auto  pt-0' />
      </div>
      </div>

  )
}
