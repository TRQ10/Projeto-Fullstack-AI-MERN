import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if(form.prompt) {
      setGeneratingImg(true)
      axios.post('http://localhost:6969/api/v1/dalle', { prompt: form.prompt }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async response => {
        const data = await response.data;
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
    }).catch(error => {
      alert(error);
    }).finally(() =>{
      setGeneratingImg(false);
    })   
    } else {
        toast('Por favor digite um prompt');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        await axios.post('http://localhost:6969/api/v1/post', { ...form }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className='max-w-7xl mx-auto'>
       <div>
        <h1 className='font-extrabold text-[#222328] 
        text-[32px]'>Criar</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w
        [500px]'>Crie imagens imaginativas e 
        visualmente impressionantes geradas através do DALL-E Ai e as compartilhe
        com a comunidade.</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., Dayse"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Gerando...' : 'Gerar'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>Apos ter criado a imagem você pode compartilhar com outros
            na comunidade</p>
            <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Compartilhando...' : 'Compartilhe com a comunidade'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;