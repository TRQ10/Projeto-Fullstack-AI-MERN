import React, { useEffect, useState } from 'react';
import { Loader, Card, FormField } from '../components';




const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#fefefe] text-xl uppercase">{title}</h2>
  );
};


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('https://backend-ai-project.onrender.com/api/v1/post', {
          methos: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase()));

        setSearchedResults(searchResults);
      }, 500)
    );
  }

  return (
    <>
    <body className='overflow-hidden'>
      <section className=' flex flex-col justify-center items-center max-w-full h-auto mx-auto box-border p-5 overflow-hidden'>
        <div className='flex flex-col justify-center items-center m-0 p-0 w-[95vw] md:w-[80vw] lg:w-[60vw]'>
          <h1 className='font-extrabold 
        text-[3.5rem] text-[#8544ff] text-center'>Boas-vindas à dAIsy</h1>
          <p className='mt-2 text-[#FEFEFE] text-[16px] text-center'>Somos uma rede social para criação e compartilhamento de imagens criativas geradas pela <span className='text-[#C1A4F8]'>DALL-E AI</span> através da galeria do site onde todos podem visualizar suas criações! </p>
        </div>

        <div className='mt-16 flex flex-col justify-center items-center m-0 p-0 w-[60vw] lg:w-[50vw] text-5xl'>
          <FormField
            labelName="Pesquisar post"
            type="text"
            name="text"
            placeholder="Pesquise por posts da comunidade"
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
      </section>

      <section className='w-full p-5 overflow-hidden'>
        <div className='w-full h-auto flex-row flex-wrap gap-1'>
          {loading ? (
            <div className='flex justify-center items-center'>
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className='font-mediu text-[#FFFFFF] 
              text-xl mb-3'>
                  Mostrando resultados para <span className='text-purple-300'>{searchText}</span>
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3
            xs:grid-cols-1 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="Sem resultados para sua pesquisa"
                    
                  />
                ) : (
                  <RenderCards
                    data={allPosts}
                    title="Sem Posts"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </section>
      </body>
      </>
  );
};

export default Home;
