import React from 'react';
import Modal from 'react-modal'
import { download } from '../assets';
import { downloadImage } from '../utils';
import { useState } from 'react';

Modal.setAppElement('#root');


const Card = ({ _id, name, prompt, photo }) => {

  const [modalIsOpen, setIsOpen] = useState(false);

  function abrirModal() {
    setIsOpen(true);
  }

  function fecharModal() {
    setIsOpen(false);
  }

  return (
    <>
      <section className='flex flex-col m-0 p-0'>
        <div className=" flex flex-col rounded-xl relative group">
          {/* shadow-card hover:shadow-cardhover card */}
          <div>
            <img
              className="w-full h-auto object-cover rounded-t-xl cursor-pointer"
              src={photo}
              alt={prompt}
              onClick={abrirModal}
            />
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={fecharModal}
              contentLabel="Modal de exemplo"
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                  margin: '0',
                  inset: 'none'
                },
                content: {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  overflow: 'hidden',
                  border: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '20px',
                  padding: '10px',
                  height: 'auto'
                }
              }
              }
            >
              <div className='flex w-full justify-end justify-self-start'>
                <i class='bx bx-x w-5 text-5xl mr-8 cursor-pointer' onClick={fecharModal}></i>
              </div>
              <div className='h-full flex items-center justify-center p-1 md:p-3 w-full'>
                <div className='flex flex-col justify-between md:flex-row items-center md:justify-evenly md:gap-2 gap-10 w-full'>
                  <div className='max-w-[350px] md:max-w-[400px] xl:max-w-[600px] 2xl:max-w-[700px]'>
                    <img src={photo} className='w-auto h-[90%] rounded-md' />
                  </div>
                  <div className='flex flex-col-reverse gap-10 items-center justify-center w-[40%]'>
                    <p className="text-black text-[1em] md:text-[1.6em] prompt text-center">{prompt}</p>
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-black text-xs font-bold">{name[0]}</div>
                      <p className="text-black text-[15pt]">{name}</p>
                    </div>
                  </div>
                </div>
              </div>

            </Modal>
            <div className="group-hover:flex items-center max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
              <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
            </div>
          </div>
        </div>
        <div className='bg-[#fefefe] rounded-b-xl h-[3rem] flex flex-row justify-between p-2 gap-2 items-center'>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-black text-xs font-bold">{name[0]}</div>
            <p className="text-black text-sm">{name}</p>
          </div>
          <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className="w-6 h-6 object-contain" />
          </button>
        </div>
      </section>
    </>
  )
};

export default Card;
