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
  const horizontalSpeedMax = 0.09;
  const verticalSpeedMax = -0.03;  
  const [horizontalSpeed, setHorizontalSpeed] = useState(0);
  const [verticalSpeed, setVerticalSpeed] = useState(-0.1);

  const barrierX = 10
  const barrierYTop = -20
  const barrierYBot = 0

  const sc = useLoader(THREE.GLTFLoader, deloreansilver).scene;

  document.onkeydown = checkKey;
  function checkKey(e) {
      e = e || window.event;
      if (e.keyCode == '37') {
        // LEFT arrow
        setHorizontalSpeed(horizontalSpeedMax);
      }
      else if (e.keyCode == '39') {
        // RIGHT arrow
        setHorizontalSpeed(-horizontalSpeedMax);
      }
  }

  useFrame(() => {
    // Vertical Travel Barrier
    if(sc.position.z < barrierYTop){
      setVerticalSpeed(-verticalSpeedMax);
    }else if(sc.position.z > barrierYBot){
      setVerticalSpeed(verticalSpeedMax);
    }
  
    // Horizontal Travel Barrier
    if(sc.position.x < -barrierX){
      setHorizontalSpeed(0);
      sc.position.x = -barrierX;
    }else if(sc.position.x > barrierX){
      sc.position.x = barrierX;
      setHorizontalSpeed(0);
    }
    
    // Execute Translations
    sc.translateZ(horizontalSpeed); 
    sc.translateX(verticalSpeed); /*COMMENT OUT FOR NO ARROW CONTROL*/
  });
  return <primitive object={sc} position={[0, 0, -8]} rotation={[0,(-Math.PI/2),0]} scale={[4,4,4]}/>
}

function Moutains() {
  const sc = useLoader(THREE.GLTFLoader, mountains).scene;
  return <primitive object={sc} position={[5,3,-200]} rotation={[0,-Math.PI/2,0]} scale={[60,50,56]}/>
}


/* CAMERA MOVEMENT */
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
  let c2 = Math.abs(a.y-b.y) > e ? false : true;
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


/* 3D SIGNAGE */
const scale = 5;
const posO = new THREE.Vector3(0,10,3);
const rotO = new THREE.Vector3(0,0,0);

function About3D({ api }) {
  const sc = useLoader(THREE.GLTFLoader, aboutneonsign).scene;
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
    camera.position.set(0,10,0);
  }
  
  useFrame(() => {
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
  const sc = useLoader(THREE.GLTFLoader, projectneonsign).scene;
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
  const sc = useLoader(THREE.GLTFLoader, experienceneonsign).scene;
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


/* MONOLITH */
const randomColourGenerator = () => {
  return (Math.random() * 0xfffff * 1000000);
}
function Monolith({radius, resolution}) {
  const angleAmount = 0.01;
  const sphere = useRef();
  let oldTime = Date.now();
  useFrame(() => {
    let pl = sphere.current;
    pl.rotation.y += angleAmount;
    pl.rotation.z += angleAmount;
    pl.rotation.x += angleAmount;
    if(( Date.now() - oldTime) > 1000){
      oldTime = Date.now();
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

/* FLOOR PLANE */
function MovingPlane() {
  //Color choices: CE13D1, 42FFFF
  const [speed, setSpeed] = useState(0.5)
  let floorPlane = useRef();
  useFrame(() => {
    if(floorPlane.current.position.z > (2000/2)-500){
      floorPlane.current.position.z = 0;
    }else if(floorPlane.current.position.z < -2000/2){
      setSpeed(-speed);
    }
    floorPlane.current.translateY(speed)
    });
  return (
    <line ref={floorPlane} userData={{ test: "hello" }} position={[0,0,0]} rotation={[Math.PI/2,0,0]}>
      <planeBufferGeometry attach="geometry" args={[2000, 2000, 100, 100]} />
      <lineBasicMaterial attach="material" color={0xCE13D1}  linewidth={1} />
    </line>
  );
}

/* MAIN SCENE */
const MainScene = ({ api}) =>{
  const {scene} = useRef();
  const parallaxFactor = 0.01;

  // DISABLED PARALLAX EFFECT
  /*
  useEffect(() => document.addEventListener('mousemove', handleMouseMove));
  const handleMouseMove = (event) => {
    const wW = window.innerWidth;
    const wH = window.innerHeight;
    console.log(api.currentPage());
    if(api.currentPage() === "HOME"){
      console.log("RUNNING SINCE HOME")
      camera.position.x = (event.clientX - (wW/2)) *parallaxFactor;
    }
  }
  */
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
  return (
    <div id="mainCanvas"> 
    <Canvas camera={{fov:75, aspect:window.innerWidth/window.innerHeight, near:0.1,far:300, position: [posO.x,posO.y,posO.z], rotation:[100,0,0]}} //30
            gl={{antialias:true}}
            onCreated={({ gl, camera }) => {
            gl.setClearColor(new THREE.Color('#000000'));
            camera.rotation.set(0,0,0);
            }}>
              <MainScene api={api}/>
    </Canvas>
    </div>
  );
}

export default SynthwaveBackground;
