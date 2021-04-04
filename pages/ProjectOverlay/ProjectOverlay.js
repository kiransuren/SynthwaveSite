import './ProjectOverlay.css'
import React, {useContext, useEffect, useState, useMemo} from "react";
import {useSpring, animated, useTrail, useTransition} from 'react-spring';
import MainContext from '../../MainContext';
import typeWriter from '../../utils/typeWriter'
import data from './project.json';


const ProjectCard = ({props, index}) => {
  return(
    <animated.div style={props} className="projectCardWrapper">
      <a className="projectATag" href={data[index].link} target="_blank">
        {/* <img className="project-image" src={require(source)}/> */}
        <video autoplay="true" loop="true" muted="true" className="project-image" width="250">
            <source src={require(data[index].imgsource)} type="video/mp4"/>
            Sorry, your browser doesn't support embedded videos.
        </video>
        <div className="overlay">   
            <p className="projectName">{data[index].name}</p>
            <p className="projectDescription">{data[index].description}</p>
        </div>
      </a>
    </animated.div>
  )
}

//DONT MESS WITH THE TEMPLATE STRING
const ProjectOverlay = () => {
    const api = useContext(MainContext);
    const primaryDelay = 1500;
    const titleString = 'Projects';

    // Animations
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

    // Write out title, start project card animations
    useEffect(() => {
        if(api.currentPage() === "PROJ"){
              setScaleUnderline({transform: "scale(1)", delay:300})
              setTrail({transform: "scale(1)", delay:100})
        }
         setTimeout(() => typeWriter(0, titleString, 100, "projTitle"), primaryDelay+1000);
      }, []
    );

    return(
        <animated.div id="project-overlay" style={mainProps}>
           <p><span id="projTitle"></span><span class="blinking">|</span></p>
           <div id="project-card">
           {trail.map((props, index) => <ProjectCard props={props} index={index}/>
                )}
           </div>
        </animated.div>
    )
}

export default ProjectOverlay;

// Preload mp4s (TODO: terrible way of handling mp4, find a fix)
require("../../public/videodemo/foodsterdemo.mp4");
require("../../public/videodemo/LiveLaunchDemo.mp4");
require("../../public/videodemo/deadwatchdemo.mp4")
require("../../public/videodemo/chemventorydemo.mp4");
require("../../public/videodemo/gatoraccessFulldemo.mp4");
require("../../public/videodemo/islanderdemo.mp4")
require("../../public/videodemo/swiftydemo.mp4")
require("../../public/videodemo/synthdemo.mp4")