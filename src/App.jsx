import { useRef, useState, useEffect } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationCard from './Components/LocationCard';
import ResidentCard from './Components/ResidentCard';
import Pagination from './Components/Pagination';


function App() {

  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {                                                            
    const url = `https://rickandmortyapi.com/api/location/${finder}`;
    getLocation(url);
    
  }, [finder]);
  
  const textInput = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setFinder(textInput.current.value.trim());
  }
  
  const quantity = 5;     //Elementos por Pagina
  const second = currentPage * quantity;   
  const first = second - quantity;
  //Cortocircuito de busqueda por pagina
  const residentsPart = location && location.residents.slice(first, second);
  // segundo Cortocicuito
  const totalPage = location && Math.floor(location.residents.length / quantity)+1;

  return (
     <div className='app'> 
      {
        isLoading ?
         <span class="loader"></span>
         :
        <> 
           <div className='banner'>
               <img src="https://res.cloudinary.com/dfc7m5ola/image/upload/v1706962969/rick-and-morty-top-banner-two-1.png.a82332698fcb055607e7475254feb2f3_1_ky0fc6.png" alt='Image banner' />
           </div>      
           <h1 className='title__page'>Rick and Morty</h1>
            <form 
              onSubmit={handleSubmit}
              className="app__form"
            >
              <input
                className="app__text"
                type="number"
                ref={textInput}
                placeholder='type a number (1 to 126)'
              />
              <button className='app__btn'>Search</button>
            </form>
            {
              hasError || finder==='0' ?
                <h2>This location do not exist</h2>
                :
                <>
                  <LocationCard
                     location={location}
                  />
                  <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                  />
                  <div className='app__container'>
                  {
                    residentsPart.map(resident => (
                      <ResidentCard
                        key={resident}
                        url={resident}
                      />
                    ))
                  } 
                  </div> 
                  <Pagination 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                  />
                </>
            }
        </>
      }      
    </div>    
  )
}


export default App
