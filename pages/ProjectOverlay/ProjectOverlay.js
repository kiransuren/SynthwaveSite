import './ProjectOverlay.css'
import React, {useContext, useEffect, useState, useMemo} from "react";
import {useSpring, animated, useTrail, useTransition} from 'react-spring';
import MainContext from '../../MainContext';

import data from './project.json';


const ProjectCard = ({source, projectname, description, link}) => {
  return(
      <div className="projectCardWrapper">
          <a href={link} target="_blank">
          {/* <img className="project-image" src={require(source)}/> */}
          <img className="project-image" src={source}/> 
          <div className="overlay">   
              <p className="projectName">{projectname}</p>
              <p className="projectDescription">{description}</p>
          </div>
          </a>
      </div>
  )
}

//DONT MESS WITH THE TEMPLATE STRING
const ProjectOverlay = () => {
    const api = useContext(MainContext);
    const primaryDelay = 1500;
    const mainProps = useSpring({
        height: "100vh",
        padding: "0rem",
        paddingTop: "8rem",
        from: {height: "0vh", padding: "0rem", paddingTop: "0rem"},
        config:{duration:1000},
        delay: primaryDelay
    });
    const [scaleUnderline, setScaleUnderline, stopScale] = useSpring(() => ({from: {transform: "scale(0)", duration:3000}}));
    const [trail, setTrail, stopTrail] = useTrail(data.length, ()=>({from:{transform: "scale(0)"},config:{ mass: 1, tension: 600, friction: 100 }}))

    const [projectProps, set, stop] = useSpring(() => ({
      opacity: 1, 
      transform: 'translate3d(0,0,0) scale(1) rotateX(0deg)',
      from: { transform: 'translate3d(0,0,0) scale(0) rotateX(0deg)',},
      delay: primaryDelay+1000
    }));

    function typeWriter(text, speed, i, elementID) {
      if (i < text.length) {
          console.log(i);
        document.getElementById(elementID).innerHTML += text.charAt(i);
        //console.log(txt.charAt(i));
        i++;
        setTimeout(function(){typeWriter(text, speed, i, elementID)}, speed);
      }
    }

    useEffect(() => {
        if(api.currentPage() === "PROJ"){
              setScaleUnderline({transform: "scale(1)", delay:300})
              setTrail({transform: "scale(1)", delay:100})
        }
         document.getElementById("project-overlay").addEventListener('scroll', trackScrolling);
         setTimeout(function(){typeWriter("Projects",100,0,"projTitle")}, primaryDelay+1000);
      }, []
    );

    const trackScrolling = (e) => {
      console.log(document.getElementById("project-overlay").scrollToip);
      if(window.scrollY > 50){
        //console.log("Change toolbar");
        var nav = document.getElementById("navbar");
        nav.style.backgroundColor = "white";
      }else{
        var nav = document.getElementById("navbar");
        nav.style.backgroundColor = "transparent";

      }
    }


    
  

    return(
        <animated.div id="project-overlay" style={mainProps}>
           <p><span id="projTitle"></span><span class="blinking">|</span></p>
           <div id="project-card">
           {trail.map((props, index) => 
                <animated.div style={props} className="projectCardWrapper">
                            <a className="projectATag" href={data[index].link} target="_blank">
                            {/* <img className="project-image" src={require(source)}/> */}
                            <video autoplay="true" loop="true" muted="true" className="project-image" width="250">
                                <source src={require(data[index].imgsource)}
                                        type="video/mp4"/>
                                Sorry, your browser doesn't support embedded videos.
                            </video>
                            <div className="overlay">   
                                <p className="projectName">{data[index].name}</p>
                                <p className="projectDescription">{data[index].description}</p>
                            </div>
                            </a>
                </animated.div>
                )}
           </div>
        </animated.div>
    )
}

export default ProjectOverlay;

//<img src={require("../../public/deadwatchdemo.gif")}/>


require("../../public/videodemo/foodsterdemo.mp4");
require("../../public/videodemo/LiveLaunchDemo.mp4");
require("../../public/videodemo/deadwatchdemo.mp4")

require("../../public/videodemo/chemventorydemo.mp4");
require("../../public/videodemo/gatoraccessFulldemo.mp4");
require("../../public/videodemo/islanderdemo.mp4")

require("../../public/videodemo/swiftydemo.mp4")

require("../../public/videodemo/synthdemo.mp4")