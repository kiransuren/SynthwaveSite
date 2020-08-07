import './ProjectOverlay.css'
import React, {useContext, useEffect, useState, useMemo} from "react";
import {useSpring, animated, useTrail, useTransition} from 'react-spring';
import MainContext from '../../MainContext';

//DONT MESS WITH THE TEMPLATE STRING
const ProjectOverlay = () => {
    const api = useContext(MainContext);
    const primaryDelay = 1500;
    const mainProps = useSpring({
        height: "100vh",
        padding: "4rem",
        paddingTop: "8rem",
        from: {height: "0vh", padding: "0rem", paddingTop: "0rem"},
        config:{duration:1000},
        delay: primaryDelay
    });

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
           <div id="projectContainer">

             <animated.div style={projectProps} className="project">
                <img src={require("../../public/deadwatchdemo.gif")}/>
             </animated.div>

             <animated.div style={projectProps} className="project">
                <img src={require("../../public/foodsterdemo.gif")}/>
             </animated.div>

             <animated.div style={projectProps} className="project">
                <img src={require("../../public/LiveLaunchDemo.gif")}/>
             </animated.div>

             <animated.div style={projectProps} className="project">
                <img src={require("../../public/placeholder.png")}/>
             </animated.div>

             <animated.div style={projectProps} className="project">
                <img src={require("../../public/placeholder.png")}/>
             </animated.div>

             <animated.div style={projectProps} className="project">
                <img src={require("../../public/placeholder.png")}/>
             </animated.div>


           </div>
        </animated.div>
    )
}

export default ProjectOverlay;

//<img src={require("../../public/deadwatchdemo.gif")}/>