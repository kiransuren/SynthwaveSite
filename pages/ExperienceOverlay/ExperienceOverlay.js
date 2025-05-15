import React, {useContext, useEffect} from "react";
import {useSpring, animated, useTrail} from 'react-spring';
import './ExperienceOverlay.css'
import MainContext from '../../MainContext';
import typeWriter from '../../utils/typeWriter'
import data from './experience.json';

const ExperienceCard = ({props, index}) => {
    return(
        <animated.div style={props} className="experienceCardWrapper">
            <div className="experienceTitle">
                <p className="experiencePosition" style={{display: 'inline', marginRight: '0.5em'}}>{data[index].position}</p>
                <span style={{fontSize:"3vw", color:"#2b303a", margin: '0 0.5em'}} >{"|"}</span>
                <p className="experienceEmployer" style={{display: 'inline', marginRight: '0.5em'}}>{data[index].employer}</p>
                <span className="experienceDates" style={{display: 'inline', color:"#2b303a", fontSize: '1.1em', marginLeft: '0.5em'}}>{data[index].startDate} - {data[index].endDate}</span>
            </div>
            {
                data[index].description.map((point, i) =>  <p key={i} className="experienceDescription">{">> "+point}</p>)
            }
        </animated.div>
    )
}


const ExperienceOverlay = () => {
    const [scaleUnderline, setScaleUnderline, stopScale] = useSpring(() => ({from: {transform: "scale(0)", duration:3000}}));
    const [trail, setTrail, stopTrail] = useTrail(data.length, ()=>({from:{transform: "translate(-100vw,0vw)"},config:{ mass: 5, tension: 1000, friction: 200 }}))
    const api = useContext(MainContext);
    const primaryDelay = 1500;
    const titleString = 'Experiences';
    const mainProps = useSpring({
        height: "100vh",
        padding: "0rem",
        paddingTop: "8rem",
        from: {height: "0vh", padding: "0rem", paddingTop: "0rem"},
        config:{duration:1000},
        delay: primaryDelay
    });
    
    // Write out title, start exp card animations
    useEffect(() =>{
        if(api.currentPage() === "EXP"){
            setScaleUnderline({transform: "scale(1)", delay:300})
            setTrail({transform: "translate(0vw,0vw)", delay:100})
        }
        setTimeout(() => typeWriter(0, titleString, 100, "experienceTitle"), primaryDelay+1000);
    },[])

    return(
        <animated.div id="experience-overlay" style={mainProps}>
            <p><span id="experienceTitle"></span><span className="blinking">|</span></p>
            <div id="experience-container">
                {trail.map((props, index) => 
                   <ExperienceCard key={index} props={props} index={index} />
                )
                }
            </div>
        </animated.div>
    )
}

export default ExperienceOverlay;