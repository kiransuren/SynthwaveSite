import React, {useContext, useEffect} from "react";
import {useSpring, animated} from 'react-spring';
import './AsciiTitle.css'
import MainContext from '../../MainContext'
import typeWriter from '../../utils/typeWriter'

const AsciiTitle = () => {
  const taglineText = 'Yeah, the 80s are pretty cool '; /* The text */
  const speed = 100; /* The speed/duration of the effect in milliseconds */
  const api = useContext(MainContext);
  const [props, set, stop] = useSpring(() => ({opacity: 1, transform: 'translate3d(0px,0,0) scale(0) rotateX(0deg)'}));
  
  // Zoom ASCII text in and out depending on current page
  useEffect(() => {
    set({
      transform: `translate3d(0px,0,0) scale(${api.currentPage() === 'HOME' ? 1 : 0 }) rotateX(0deg)`,
      config: {duration:1000}
     });
  });

  // Write out tagline text
  useEffect(() => {
       setTimeout(() => typeWriter(0, taglineText, speed, "tagline"), 1000);
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