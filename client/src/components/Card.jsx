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
        <div className=" flex flex-col rounded-xl relative group shadow-card hover:shadow-cardhover card">
          <div>
            <img
              className="w-full h-auto object-cover rounded-t-xl cursor-pointer"
              src={photo}
              alt={prompt}
              onClick={abrirModal}
            />
                
                ////////////////////////////////////////*Começo do Modal*/////////////////////////////////////////////
                
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={fecharModal}
              contentLabel="Modal"
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  padding: '0',
                  margin: '0',
                  zIndex: '40'
                },
                content: {
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  border: 'none',
                  margin: '0',
                  padding: '0',
                  top: '0',
                  left: '0',
                  bottom: '0',
                  right: '0',
                  overflow: 'hidden'
                }
              }
              }
            >
              <div className='bg-transparent w-full overflow-hidden rounded-none h-[100vh] fixed flex items-center justify-center flex-col' onClick={fecharModal}>
    
                  <div className='flex justify-end w-[80%] md:w-[90%] lg:w-[70%] rounded-t-lg bg-[#222121]'>
                    <i class='bx bx-x w-5 text-5xl mr-8 cursor-pointer invert' onClick={fecharModal}></i>
                  </div>

                  <div className='w-[80%] md:w-[90%] lg:w-[70%] flex justify-start items-center bg-[#222121] rounded-b-lg flex-col md:flex-row p-3'>
                    <img className="w-[70%] md:w-[60%] rounded-lg" src={photo} alt={prompt} />
                    <div className='w-full flex justify-start flex-col-reverse p-2 lg:p-5 gap-6'>
                      <p className="text-white text-[1.5em] lg:text-[1.8em] xl:text-[2.2em] prompt text-center">{prompt}</p>
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-7 h-7 md:w-9 md:h-9 lg:w-11 lg:h-11 xl:w-14 xl:h-14 rounded-full object-cover bg-[#8250e6] flex justify-center items-center text-white text-xs md:text-lg lg:text-xl xl:text-2xl font-bold">
                          {name[0]}
              /////////////////////////////*A imagem de perfil fica no lugar desse name[0] */////////////////////////////////
                            
                        </div>
                        <p className="text-white text-[1.5em] lg:text-[1.8em] xl:text-[2em]">{name}</p>
                      </div>
                    </div>

                  </div>

                
              </div>

            </Modal>


                               ////////////////////////////////////////*Fim do Modal*/////////////////////////////////////////////

            <div className="group-hover:flex items-center max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
              <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
            </div>
          </div>
        </div>
        <div className='bg-[#fefefe] rounded-b-xl h-[3rem] flex flex-row justify-between p-2 gap-2 items-center'>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-[#5d20d3] flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
              
              /////////////////////////////*A imagem de perfil fica no lugar desse name[0] */////////////////////////////////
              
            </div>
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
