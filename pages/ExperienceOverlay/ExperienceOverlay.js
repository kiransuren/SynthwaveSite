import React, {useContext, useEffect, useState} from "react";
import {useSpring, animated, useTrail, useTransition} from 'react-spring';
import MainContext from '../../MainContext';
import './ExperienceOverlay.css'

//DONT MESS WITH THE TEMPLATE STRING
const ExperienceOverlay = () => {
    const api = useContext(MainContext);
    const primaryDelay = 1500;
    const mainProps = useSpring({
        height: "100vh",
        padding: "4rem",
        paddingTop: "8rem",
        from: {height: "0vh", padding: "0rem", paddingTop: "0rem",},
        config:{duration:1000},
        delay: primaryDelay
    });

    return(
        <animated.div id="experience-overlay" style={mainProps}>
        </animated.div>
    )
}

export default ExperienceOverlay;

/*        <animated.div style={props} class="neon-wrapper">
            <div class="neon-text">NEON <br/> TEXT</div>
        </animated.div>
*/

//<img src={require("../../public/deadwatchdemo.gif")}/>