//Module Imports
import React, { useState, useEffect} from 'react'
import SynthwaveBackground from './experimental/SynthwaveBackground/SynthwaveBackground'
import AsciiTitle from './experimental/AsciiTitle/AsciiTitle';
import Navbar from './experimental/Navbar/Navbar';
import MainContext from './MainContext'
//React Routes




//React Components
import AboutOverlay from './pages/AboutOverlay/AboutOverlay';
import ExperienceOverlay from './pages/ExperienceOverlay/ExperienceOverlay';
import ProjectOverlay from './pages/ProjectOverlay/ProjectOverlay';
//Misc
import "./styles.css";

//REDUX:
//Reducer
//Store
//const MainContext = createContext(null);

export default function App(props) {
  //const [cartItems, setCartItems] = useState([]); For Hooks
  const [experimentalMode, setExperimentalMode] = useState(false)
  const setExpMode = (mode) => setExperimentalMode(mode);
  const expMode = () => experimentalMode;

  const [page, setPage] = useState("HOME");
  const setCurrentPage = (inPage) => setPage(inPage);
  const currentPage = () => page;

  const [pPage, setpPage] = useState("HOME");
  const setPriorPage = (inPage) => setpPage(inPage);
  const priorPage = () => pPage;


  const api = {setCurrentPage, currentPage, setPriorPage, priorPage, setExpMode, expMode};

  const renderPage = () =>{
    if(api.currentPage() ==="HOME"){
    }else if (api.currentPage() ==="ABT"){
      return <AboutOverlay />
    }else if (api.currentPage() ==="PROJ"){
       return <ProjectOverlay />
    }else if (api.currentPage() ==="EXP"){
      return <ExperienceOverlay />
    }
  }
  useEffect(()=>{
/*     if(api.expMode()){
      //document.getElementById("primary-div").style.zIndex = -100;
      //document.getElementById("exmode").style.zIndex = 100;

      document.getElementById("primary-div").style.zIndex = -100;
      document.getElementById("exmode").style.zIndex = 100;
    }else{
      document.getElementById("primary-div").style.zIndex = 100;
      document.getElementById("exmode").style.zIndex = -100;
    } */
  })

  return (
    <>
    <MainContext.Provider value={api}>
            <SynthwaveBackground />
            <Navbar />
            <div id="overlay">
              <div id="titleOverlay">
                <AsciiTitle />
              </div>
              {renderPage()}
            </div>
  
    </MainContext.Provider>
    </>
  );
}




/*             <SynthwaveBackground />
            <Navbar />
            <div id="overlay">
              <div id="titleOverlay">
                <AsciiTitle />
              </div>
              {renderPage()}
            </div> */