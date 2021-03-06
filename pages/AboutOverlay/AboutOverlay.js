import React, {useEffect} from "react";
import {useSpring, animated, useTrail} from 'react-spring';
import './AboutOverlay.css'
import typeWriter from '../../utils/typeWriter'

const AboutOverlay = () => {
    const primaryDelay = 2000;
    const commands = ["  I’m a passionate software developer, electrical meddler and 3D design/mechanical tinkerer.","  I love to explore new tech and enjoy collaborating with friends and strangers alike on hackathons and other projects.","  And yes, the making of this site was heavily influenced by a certain frizzy haired scientist and his Delorean that could travel through time."]
    const titleString = 'Who Is Kiran Surendran?';

    // Animations
    const mainProps = useSpring({
        height: "100vh",
        padding: "4rem",
        paddingTop: "8rem",
        from: {height: "0vh", padding: "0rem", paddingTop: "0rem",},
        config:{duration:1000},
        delay: primaryDelay
    });
    const showItems = useSpring({
        opacity: 1,
        from: {opacity: 0},
        config:{duration:500},
        delay: primaryDelay + 1000
    });
    const trail = useTrail(3, {opacity: 1, delay:primaryDelay+2500, from:{opacity:0}, duration:2000}) /*config:{ mass: 1, tension:300, friction: 26 */
    
    // Write out title
    useEffect(() => {
        setTimeout(() => typeWriter(0, titleString, 100, "about-title"), primaryDelay+1000);
    }, []);

    // Show subtext
    const showCom = () =>{
        return trail.map((props, index) =>
        <animated.p className="aboutContent" style={props}>>>{commands[index]}</animated.p>)
    }

    return(
        <animated.div id="about-overlay" style={mainProps}>
            <animated.div id="aboutContainer">
                <p><span id="about-title"></span><span class="blinking">|</span></p>
                {showCom()}
            </animated.div>
        </animated.div>
    )
}

export default AboutOverlay;