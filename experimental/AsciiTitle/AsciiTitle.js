import React, {useContext, useEffect, useState} from "react";
import {useSpring, animated} from 'react-spring';
import './AsciiTitle.css'
import MainContext from '../../MainContext'
//DONT MESS WITH THE TEMPLATE STRING
const AsciiTitle = () => {
  const api = useContext(MainContext);
  const [toggle,setToggle] = useState(false);
  const [props, set, stop] = useSpring(() => ({opacity: 1, transform: 'translate3d(0px,0,0) scale(0) rotateX(0deg)'}));
          //setProj(!proj);
        //set({width: '100rem', from: {width: '0rem'},
        //config: {mass:10}
        //})
  var m;
  useEffect(() => {
    if(api.currentPage() != "HOME"){
      console.log("ASCII");
      console.log("SpringSet?");
      set({
        transform: 'translate3d(0px,0,0) scale(0) rotateX(0deg)',
        config: {duration:1000}
       });
    }
    if(api.currentPage() === "HOME"){
      console.log("ASCII");
      console.log("SpringSet?");
      set({
        transform: 'translate3d(0px,0,0) scale(1) rotateX(0deg)',
        config: {duration:1000}
       });
       //document.getElementById("tagline").innerHTML = "";
       //setTimeout(typeWriter, 1000);
    }
  });

  var i = 0;
  var txt = 'Programmer | Designer | Tech Enthusiast'; /* The text */
  var speed = 100; /* The speed/duration of the effect in milliseconds */
  function typeWriter() {
    if (i < txt.length) {
      document.getElementById("tagline").innerHTML += txt.charAt(i);
      //console.log(txt.charAt(i));
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  useEffect(() => {
       setTimeout(typeWriter, 1000);
    }, []
  );

  return(
        <animated.div id="titleparent" style={props} className={api.currentPage()}>
          <p id="tagline"></p>
          <pre id="title">
{`__  _______ _____            _   _      _____ _    _ _____  ______ _   _ _____  _____            _   _ 
| |/ /_   _|  __ \\     /\\   | \\ | |    / ____| |  | |  __ \\|  ____| \\ | |  __ \\|  __ \\     /\\   | \\ | |
| ' /  | | | |__) |   /  \\  |  \\| |   | (___ | |  | | |__) | |__  |  \\| | |  | | |__) |   /  \\  |  \\| |
|  <   | | |  _  /   / /\\ \\ | . \` |    \\___ \\| |  | |  _  /|  __| | . \` | |  | |  _  /   / /\\ \\ | . \` |
| . \\ _| |_| | \\ \\  / ____ \\| |\\  |    ____) | |__| | | \\ \\| |____| |\\  | |__| | | \\ \\  / ____ \\| |\\  |
|_|\\_\\_____|_|  \\_\\/_/    \\_\\_| \\_|   |_____/ \\____/|_|  \\_\\______|_| \\_|_____/|_|  \\_\\/_/    \\_\\_| \\_|
`}
          </pre>
        </animated.div>
    )
}

export default AsciiTitle;