import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";
import { useAuthStore } from "../store/store";
import toast, { Toaster } from "react-hot-toast";

const CreatePost = () => {
 
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const { username } = useAuthStore((state) => state.auth);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: username,
    prompt: "",
    photo: "",
  });

  const generateImage = async () => {
    if (form.prompt) {
      setGeneratingImg(true);
      axios
        .post(
          "http://localhost:6969/api/v1/dalle",
          { prompt: form.prompt },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (response) => {
          const data = await response.data;
          setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setGeneratingImg(false);
        });
    } else {
      toast.error("Por favor digite um prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        await axios.post(
          "http://localhost:6969/api/v1/post",
          { ...form },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Por favor gere uma mensagem com os detalhes apropriados");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1
            className="font-extrabold text-indigo-600
        text-5xl mt-5"
          >
            Criar
          </h1>
          <p
            className="mt-2 text-white text-[16px] text-justify p-3 max-w
        [500px]"
          >
            Exagere na criatividade e crie imagens visualmente impressionantes
            geradas através do{" "}
            <strong className="text-[#c1a4f8] cursor-pointer">DALL-E AI</strong>{" "}
            e surpreenda todos seus amigos! Após criar sua imagem você pode
            compartilhar com todo mundo na comunidade.
          </p>
        </div>

        <div className="flex flex-row lg:flex-col justify-center items-center">
          <div className="grid lg:grid-cols-1 grid-cols-1">
            <div className="ml-5 lg:w-[38rem]">
              <FormField
                labelName="Qual prompt deseja usar?"
                type="text"
                name="prompt"
                placeholder="Ex.: Pikachu, cinematic, digital art"
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="relative lg:ml-[50rem] lg:mt-[5rem] ml-10 mt-10 bg-gray-50 border-2 border-indigo-600 text-gray-900 text-sm rounded-lg w-64 p-3 h-64 flex justify-center items-center">
        {form.photo ? (
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

      <div className="flex flex-col">
        <div className="mt-5">
          <button
            type="button"
            onClick={generateImage}
            className="mt-3 ml-[6.9rem] lg:mt-[32px] lg:ml-[55rem] w-[10rem] text-white bg-indigo-600 hover:bg-[#8250e6] font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Gerando..." : "Gerar"}
          </button>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-3 ml-[6.9rem]  lg:ml-[50rem] w-[10rem] text-white bg-indigo-600 hover:bg-[#8250e6] font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Compartilhando..." : "Compartilhe com a comunidade!"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
