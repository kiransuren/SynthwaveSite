//Module Imports
import React, { useState, useEffect} from 'react'
import SynthwaveBackground from './experimental/SynthwaveBackground/SynthwaveBackground'
import AsciiTitle from './experimental/AsciiTitle/AsciiTitle';
import Navbar from './experimental/Navbar/Navbar';
import MainContext from './MainContext'

//React Components
import AboutOverlay from './pages/AboutOverlay/AboutOverlay';
import ExperienceOverlay from './pages/ExperienceOverlay/ExperienceOverlay';
import ProjectOverlay from './pages/ProjectOverlay/ProjectOverlay';

//Misc
import "./styles.css";



export default function App(props) {
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

  const changeFunc = () =>{
    document.getElementById("song").play();
    setExperimentalMode(false);
  }
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

  return (
    <>
    <MainContext.Provider value={api}>
          {
              experimentalMode ?
              <div id="spinOver" onClick={ () => changeFunc() }>
              <div className="spinner">
                <p id="loadText">LOADING</p>
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
                <p id="warningText">WARNING: You May Experience Large Lag Spikes!</p>
               </div>
               </div>
              :
              <>
            <SynthwaveBackground />
            <Navbar />
            <div id="overlay">
              <div id="titleOverlay">
                <AsciiTitle />
              </div>
              {renderPage()}
            </div></>
          }
  
    </MainContext.Provider>
    </>
  );
}


