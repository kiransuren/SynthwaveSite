import React, {useState, useContext} from "react";
import MainContext from '../../MainContext'
import {useSpring, animated} from 'react-spring'
import './Navbar.css'
//DONT MESS WITH THE TEMPLATE STRING
const Navbar = () => {
    const [proj, setProj] = useState(true);
    const api = useContext(MainContext);
    const [props, set, stop] = useSpring(() => ({opacity: 1}))


    const onAboutPressed = (event) =>{
        api.setPriorPage(api.currentPage());
        api.setCurrentPage("ABT");
        console.log(api.currentPage());
    }

    const onProjectPressed = (event) =>{
        api.setPriorPage(api.currentPage());
        api.setCurrentPage("PROJ");
        //setProj(!proj);
        /*set({transform: 'translate3d(0px,0,0) scale(0.9) rotateX(0deg)', from: {transform: 'translate3d(0px,0,0) scale(1) rotateX(0deg)'},
        config: {mass:10}
        });*/
        console.log(api.currentPage());
    }

    const onExperiencePressed = (event) =>{
        api.setPriorPage(api.currentPage());
        api.setCurrentPage("EXP");
        console.log(api.currentPage());
    }

    const onHomePressed = (event) =>{
        api.setPriorPage(api.currentPage());
        api.setCurrentPage("HOME");
        console.log(api.currentPage());
        /*
        console.log(event.target.style );
        event.target.style.fontSize = "20rem";
        console.log(event.target.style);*/
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
                <animated.input value="/about" type="button" className="navbutton" onClick={onAboutPressed}/>
                <animated.input value="/projects" type="button" className="navbutton" onClick={onProjectPressed}/>
                <animated.input value="/experience" type="button" className="navbutton" onClick={onExperiencePressed}/>
                <animated.input value="/home" type="button" className="navbutton" onClick={onHomePressed}/>
            </animated.div>
        </animated.nav>
    )
}


export default Navbar;