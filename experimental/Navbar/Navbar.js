import React, {useContext} from "react";
import MainContext from '../../MainContext'
import {useSpring, animated} from 'react-spring'
import './Navbar.css'


const Navbar = () => {
    const api = useContext(MainContext);
    const [props, set, stop] = useSpring(() => ({opacity: 1}))

    const onPageClicked = (pageName) => {
        api.setPriorPage(api.currentPage());
        api.setCurrentPage(pageName);
    }
    
    return(
        <animated.nav id="navbarExperimental">
            <div id="contactButtons" >
                <a href="https://github.com/kiransuren" target="_blank">
                    <img className="contacts" src={require("../../public/github.png")}/>
                </a>
                <a href="https://www.linkedin.com/in/kiran-surendran1" target="_blank">
                    <img className="contacts" src={require("../../public/linkedin.png")}/>
                </a>
                <a href="mailto:kirank.suren@gmail.com" target="_blank">
                    <img className="contacts" src={require("../../public/email.png")}/>
                </a>
            </div>
            <animated.div id="navButtons" style={props}>
                <animated.input value="/about" type="button" className="navbutton" onClick={() => onPageClicked("ABT")}/>
                <animated.input value="/projects" type="button" className="navbutton" onClick={() => onPageClicked("PROJ")}/>
                <animated.input value="/experience" type="button" className="navbutton" onClick={() => onPageClicked("EXP")}/>
                <animated.input value="/home" type="button" className="navbutton" onClick={() => onPageClicked("HOME")}/>
            </animated.div>
        </animated.nav>
    )
}


export default Navbar;