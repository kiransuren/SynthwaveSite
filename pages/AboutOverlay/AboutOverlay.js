import React, {useContext, useEffect, useState} from "react";
import {useSpring, animated, useTrail, useTransition} from 'react-spring';
import './AboutOverlay.css'
import MainContext from '../../MainContext';

//DONT MESS WITH THE TEMPLATE STRING
const AboutOverlay = () => {
    const api = useContext(MainContext);
    const primaryDelay = 2000;
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
    
    //let commands = [{text:" ", key:0},{text:"  I’m a passionate software developer, electrical meddler and 3D design/mechanical tinkerer.",key:1 }, {text:"  I love to explore new tech and enjoy collaborating with friends and strangers alike on hackathons and other projects.",key:2 }, {text:"  And yes, I was heavily influenced by a certain frizzy haired scientist and his Delorean that could travel through time.", key:3 }]
    let commands = ["  I’m a passionate software developer, electrical meddler and 3D design/mechanical tinkerer.","  I love to explore new tech and enjoy collaborating with friends and strangers alike on hackathons and other projects.","  And yes, the making of this site was heavily influenced by a certain frizzy haired scientist and his Delorean that could travel through time."]
    /*//let commands = ["  I’m a passionate software developer, electrical meddler and 3D design/mechanical tinkerer.","  I love to explore new tech and enjoy collaborating with friends and strangers alike on hackathons and other projects.","  And yes, I was heavily influenced by a certain frizzy haired scientist and his Delorean that could travel through time."]
    const [items, set] = useState(commands);
    const transitions = useTransition(items, item => item.key, {
    from: { opacity: 0 },
    enter: { opacity:1 },
    trail: 4000
    })*/

    
      //var i = 0;
      // txt = 'Who Is Kiran Surendran?'; /* The text */
      //var speed = 30; /* The speed/duration of the effect in milliseconds */
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
           setTimeout(function(){typeWriter('Who Is Kiran Surendran?',50,0,"title1")}, primaryDelay+1000);
        }, []
      );

      const showCom = () =>{
        return trail.map((props, index) =>
        <animated.p className="aboutContent" style={props}>>>{commands[index]}</animated.p>)
      }

    return(
        <animated.div id="about-overlay" style={mainProps}>
            <animated.div id="aboutContainer">
                <p><span id="title1"></span><span class="blinking">|</span></p>
                {showCom()}
            </animated.div>
            {/* <animated.div style={hProps} id="a1">
                <p><span id="title1"></span><span class="blinking">|</span></p>
            </animated.div>
            <div id="b">
            </div>
            <animated.div style={contentProps} id="a2">
                <p className="aboutContent">I’m a passionate software developer, electrical meddler and 3D design/mechanical tinkerer.</p>
                <p className="aboutContent">I love to explore new tech and enjoy collaborating with friends and strangers alike on hackathons and other projects.</p>
                <p className="aboutContent">And yes, I was heavily influenced by a certain frizzy haired scientist and his Delorean that could travel through time.</p>
            </animated.div>  */}
        </animated.div>
    )
}

export default AboutOverlay;

/*        <animated.div style={props} class="neon-wrapper">
            <div class="neon-text">NEON <br/> TEXT</div>
        </animated.div>
*/

//<img src={require("../../public/deadwatchdemo.gif")}/>

/*
                <div className="content">
                    <img src={require("../../public/foodsterdemo.gif")}/>
                </div>
                <div className="content">
                    <img src={require("../../public/deadwatchdemo.gif")}/>
                </div>
                <div className="content">
                    <img src={require("../../public/LiveLaunchDemo.gif")}/>
                </div>
*/