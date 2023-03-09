import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Loader, Card, FormField } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
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
        const response = await axios({
          method: 'GET',
          url: 'http://localhost:6969/api/v1/post',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        if (response.status === 200) {
          const result = await response.data;
      
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  },[]);

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
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] 
        text-[32px]'>Vitrine da comunidade</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w
        [500px]'>Navegue por imagens imaginativas e 
        visualmente impressionantes geradas por DALL-E Ai</p>
      </div>

      <div className='mt-16 '>
        <FormField
          labelName="Pesquise por posts"
          type="text"
          name="text"
          placeholder="Pesquise por posts"
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-mediu text-[#666e75] 
              text-xl mb-3'>
                  Mostrando resultados para <span className='text-
                  [#222328]'>{searchText}</span>
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
  );
};

export default Home;