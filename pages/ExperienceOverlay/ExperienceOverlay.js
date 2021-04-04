import React from "react";
import {useSpring, animated } from 'react-spring';
import './ExperienceOverlay.css'

const ExperienceOverlay = () => {
    const primaryDelay = 1500;

    // Animations
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