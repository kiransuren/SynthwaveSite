//Module Imports
import React, {useRef, useState, Suspense,useEffect, useContext} from 'react'
import { extend as applyThree, Canvas, useFrame, useThree, useLoader } from 'react-three-fiber'
import * as THREE from 'Three';
import MainContext from '../../MainContext'
//GLTF Loader and models to be loaded
import deloreansilver from '../models/deloreansilver.glb'
import mountains from '../models/synthwavemountainsV1.glb'

import aboutneonsign from '../models/aboutNeonsignV1.glb'
import projectneonsign from '../models/projectNeonsignV1.glb'
import experienceneonsign from '../models/experienceNeonsignV1.glb'

import { GLTFLoader } from '../../loaders/gltfloader'

import "./SynthwaveBackground.css";


//React Routes

//React Components

//Postprocessing
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
applyThree({ EffectComposer, RenderPass, UnrealBloomPass });


function BloomEffect() {
    const { gl, scene, camera, size } = useThree()
    const composer = useRef()
    useEffect(() => void composer.current.setSize(size.width, size.height), [size])
    // This takes over as the main render-loop (when 2nd arg is set to true)
    useFrame(() => composer.current.render(), true)
    return (
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <unrealBloomPass attachArray="passes" args={[new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85]} threshold={0} strength={0.8} radius={1} renderToScreen />
      </effectComposer>
    )
}


function Delorean() {
  var carspeed = -0.3 *0.1;
  var carspeedS = 0.3 *0.3;
  const parallaxFactor = 0.001;
  //useEffect(() => document.addEventListener('mousemove', handleMouseMove));
  var gltf = useLoader(THREE.GLTFLoader, deloreansilver);
  var sc = gltf.scene;
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [playerSpeedZ, setPlayerSpeedZ] = useState(0);

  const handleMouseMove = (event) => {
      const wW = window.innerWidth;
      const wH = window.innerHeight;
      //console.log((event.clientX - (wW/2)) *parallaxFactor);
      sc.position.x = (event.clientX - (wW/2)) *parallaxFactor;
      //camera.position.y = ((event.clientY) * parallaxFactor * 10) + 3;
  }

  //document.onmousemove = handleMouseMove;

  document.onkeydown = checkKey;

  function checkKey(e) {

      e = e || window.event;

      if (e.keyCode == '38') {
          // up arrow
      }
      else if (e.keyCode == '40') {
          // down arrow
      }
      else if (e.keyCode == '37') {
        // left arrow
        setPlayerSpeedZ(carspeedS);
        console.log("LEFT");
      }
      else if (e.keyCode == '39') {
        // right arrow
        setPlayerSpeedZ(-carspeedS);
        console.log("RIGHT");
      }
  }


  useEffect(()=>{document.onkeydown = checkKey;},[])

  useEffect(()=>{
  })
  useFrame(({ clock, camera }) => {
    if(sc.position.z < (-20)){
        //speed = -speed;
        carspeed = -carspeed;
        //sphere.material.color.setHex(randomColourGenerator());
    }else if(sc.position.z > 0){
        carspeed = -carspeed;
  }
    
    if(sc.position.x < -10){
      //speed = -speed;
      setPlayerSpeedZ(0);
      sc.position.x = -10;
      //sphere.material.color.setHex(randomColourGenerator());
    }else if(sc.position.x > 10){
      sc.position.x = 10;
      setPlayerSpeedZ(0);
    }
    
    sc.translateX(carspeed);
    sc.translateZ(playerSpeedZ); /*COMMENT OUT FOR NO ARROW CONTROL*/
  });

  return <primitive object={sc} position={[0, 0, -8]} rotation={[0,(-Math.PI/2),0]} scale={[4,4,4]}/>
}

function Moutains() {
  const gltf = useLoader(THREE.GLTFLoader, mountains);
  const sc = gltf.scene;
  return <primitive object={sc} position={[5,3,-200]} rotation={[0,-Math.PI/2,0]} scale={[60,50,56]}/>
}


const scale = 5;
const posO = new THREE.Vector3(0,10,3);
const rotO = new THREE.Vector3(0,0,0);

const cameraShift = (camera,b) =>{
  const shift = 0.5;
  var moved = false;
  if(camera.position.x !== b.x){
    camera.position.x -= shift * (camera.position.x-b.x)/Math.abs(camera.position.x-b.x);
    moved = true;
  }
  if(camera.position.y !== b.y){
    camera.position.y -= shift * (camera.position.y-b.y)/Math.abs(camera.position.y-b.y);
    moved = true;
  }
  if(camera.position.z !== b.z){
    camera.position.z -= shift * (camera.position.z-b.z)/Math.abs(camera.position.z-b.z);
    moved = true;
  }
  return moved;
}

const checkSimilarVec = (a,b,e) =>{
  //let c1 = Math.abs(a.x-b.x) > e ? false : true;
  let c2 = Math.abs(a.y-b.y) > e ? false : true;
  //let c3 = Math.abs(a.z-b.z) > e ? false : true;
  //return (c1 && c2 && c3);
  return (c2);
}
const cameraRotate = (camera,b) =>{
  const shift = 0.1;
  if(!checkSimilarVec(camera.rotation, b, 0.001)){
    camera.rotation.y -= shift * (camera.rotation.y-b.y)/Math.abs(camera.rotation.y-b.y);
    return true;
  }
  return false;
}

function About3D({ api }) {
  const gltf = useLoader(THREE.GLTFLoader, aboutneonsign);
  const sc = gltf.scene;
  const { camera } = useThree();
  const destVec = new THREE.Vector3(-50, 10,-50);
  const rotVec = new THREE.Vector3(0,1,0);
  const moveCamera = (e) =>{
    if(api.currentPage() === "ABT"){
      api.setPriorPage(api.currentPage());
      api.setCurrentPage("HOME");
    }else{
      api.setPriorPage(api.currentPage());
      api.setCurrentPage("ABT");
    }
    //console.log('clickAbout');
    camera.position.set(0,10,0);
  }
  
  useFrame(() => {
    //console.log(rotVec)
    //console.log(camera.rotation);
   if(api.currentPage() === "ABT"){
    cameraRotate(camera, rotVec);
    cameraShift(camera,destVec);
   }   
   else if(api.currentPage() === "HOME" && api.priorPage() === "ABT"){
    cameraRotate(camera, rotO);
    cameraShift(camera,posO);
 }
  });
  return <primitive onClick={moveCamera} object={sc} position={[-60, 2.5,-60]} rotation={[Math.PI/2,0,-1]} scale={[scale,scale,scale]}/>
}

function Project3D({ api }) {
  const gltf = useLoader(THREE.GLTFLoader, projectneonsign);
  const sc = gltf.scene;
  const { camera } = useThree();
  const destVec = new THREE.Vector3(0, 5,-40);
  const rotVec = new THREE.Vector3(0,0,0);
  const moveCamera = (e) =>{
    if(api.currentPage() ==="PROJ"){
      api.setCurrentPage("HOME");
    }else{
      api.setCurrentPage("PROJ");
    }
    camera.position.set(0,5,0);
  }
  useFrame(() => {
   if(api.currentPage() === "PROJ"){
    cameraRotate(camera, rotVec);
    cameraShift(camera,destVec);
   }   
   else if(api.currentPage() === "HOME" && api.priorPage() === "PROJ"){
    cameraRotate(camera, rotO);
    cameraShift(camera,posO);
 }
  });
  return <primitive onClick={moveCamera} object={sc} position={[0, 2.5, -60]} rotation={[Math.PI/2,0,0]} scale={[scale,scale,scale]}/>
}

function Experience3D({ api }) {
  const gltf = useLoader(THREE.GLTFLoader, experienceneonsign);
  const sc = gltf.scene;
  const { camera } = useThree();
  const destVec = new THREE.Vector3(45, 10,-50);
  const rotVec = new THREE.Vector3(0,-1,0);
  const moveCamera = (e) =>{
    if(api.currentPage() ==="EXP"){
      api.setCurrentPage("HOME");
    }else{
      api.setCurrentPage("EXP");
    }
    camera.position.set(0,10,0);
  }
  
  useFrame(() => {
/*     console.log("Rotation", camera.rotation);
    console.log("RotO", rotO); */
    if(api.currentPage() === "EXP"){
      cameraRotate(camera, rotVec);
      cameraShift(camera,destVec);
    }   
    else if(api.currentPage() === "HOME" && api.priorPage() === "EXP"){
      cameraRotate(camera, rotO);
      cameraShift(camera,posO);
    }
  });
  return <primitive onClick={moveCamera} object={sc} position={[60, 2.5, -60]} rotation={[Math.PI/2,0,1]} scale={[scale,scale,scale]}/>
}





const randomColourGenerator = () => {
  return (Math.random() * 0xfffff * 1000000);
}

function Monolith({radius, resolution}) {
  let sphere = useRef();
  var d = new Date();
  let delta = d.getTime();
  useFrame(() => {
    d = new Date(); //Refresh Date
    let pl = sphere.current;
    let angleAmount = 0.01;
    pl.rotation.y += angleAmount;
    pl.rotation.z += angleAmount;
    pl.rotation.x += angleAmount;
    //console.log(d.getTime()-delta);
    if(( d.getTime() - delta) > 1000){
      delta = d.getTime();
      //console.log(delta)
      pl.material.color.setHex(randomColourGenerator());
    }

    });
  return (
    <line ref={sphere} userData={{ test: "hello" }} position={[0, 25, -140]} rotation={[Math.PI/2,0,0]} scale={[ 0.7, 0.7, 0.7]}>
      <sphereBufferGeometry attach="geometry" args={[radius, resolution, resolution]} />
      <lineBasicMaterial attach="material" color={0x00fc0d}  linewidth={1} />
    </line>
  );
}



function MovingPlane() {
  var speed = 0.5;
  let planeR = useRef();
  useFrame(() => {
    let pl = planeR.current;
    if(pl.position.z > (2000/2)-500){
      pl.position.z = 0;
      //speed = -speed;
    }else if(pl.position.z < -2000/2){
      speed = -speed;
    }
    pl.translateY(speed)
    });
  return (
    <line ref={planeR} userData={{ test: "hello" }} position={[0,0,0]} rotation={[Math.PI/2,0,0]}>
      <planeBufferGeometry attach="geometry" args={[2000, 2000, 100, 100]} />
      <lineBasicMaterial attach="material" color={0xCE13D1}  linewidth={1} />
    </line>
  );
}
//Color choices: CE13D1, 42FFFF


const MainScene = ({cPage, api}) =>{
  const {scene} = useRef();
  const [moveUp, setMoveUp] = useState(false);
  const { camera } = useThree();
  const parallaxFactor = 0.001;
  //useEffect(() => document.addEventListener('mousemove', handleMouseMove));
  const handleMouseMove = (event) => {
    const wW = window.innerWidth;
    const wH = window.innerHeight;
    //console.log((event.clientX - (wW/2)) *parallaxFactor);
    camera.position.x = (event.clientX - (wW/2)) *parallaxFactor;
    //camera.position.y = ((event.clientY) * parallaxFactor * 10) + 3;
  }/*
  
  useFrame(({camera})=>{
    let cameraSpeed = 0.01
    //console.log(camera.rotation.x);
    if(cPage!=="HOME" && camera.rotation.x < 1){
      camera.rotation.x += cameraSpeed;
    }
    if(cPage==="HOME" && camera.rotation.x > 0){
      camera.rotation.x -= cameraSpeed;
    }
  });*/

  return(
  <scene ref={scene}>
            {true?  <BloomEffect /> : <></>}
            <ambientLight color={0xFFFFFF} strength={100}/>
            <pointLight color={0xFFFFFF} strength={1000} distance={1000}/>
            <Suspense fallback={null}>
              <Delorean />
            </Suspense>
            <Suspense fallback={null}>
              <MovingPlane />
            </Suspense>
            <Suspense fallback={null}>
              <Moutains />
            </Suspense>
            <Suspense fallback={null}>
              <Monolith radius={30} resolution={10}/>
            </Suspense>
            <Suspense fallback={null}>
              <About3D api={api}/>
            </Suspense>
            <Suspense fallback={null}>
              <Project3D api={api} />
            </Suspense>
            <Suspense fallback={null}>
              <Experience3D api={api}/>
            </Suspense>
    </scene>
  );
}

const SynthwaveBackground = (props) => {
  const api = useContext(MainContext);
  var cPage = api.currentPage();
  return (
    <div id="mainCanvas"> 
    <Canvas camera={{fov:75, aspect:window.innerWidth/window.innerHeight, near:0.1,far:300, position: [posO.x,posO.y,posO.z], rotation:[100,0,0]}} //30
            gl={{antialias:true}}
            onCreated={({ gl, camera }) => {
            gl.setClearColor(new THREE.Color('#000000'));
            camera.rotation.set(0,0,0);
            }}>
              <MainScene cPage={cPage} api={api}/>
    </Canvas>
    </div>
  );
}

export default SynthwaveBackground;
