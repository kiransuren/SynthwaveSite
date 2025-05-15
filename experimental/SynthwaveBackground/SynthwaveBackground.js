//Module Imports
import React, {useRef, useState, Suspense,useEffect, useContext} from 'react'
import { extend as applyThree, Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import * as THREE from 'three';
import MainContext from '../../MainContext'
//GLTF Loader and models to be loaded
import deloreansilver from '../models/deloreansilver.glb'
import mountains from '../models/synthwavemountainsV1.glb'

import aboutneonsign from '../models/aboutNeonsignV1.glb'
import projectneonsign from '../models/projectNeonsignV1.glb'
import experienceneonsign from '../models/experienceNeonsignV1.glb'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import "./SynthwaveBackground.css";
import speeds from './speeds.json';

//React Routes

//React Components

//Postprocessing
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function BloomEffect() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0}
        luminanceSmoothing={0.2}
        intensity={0.5}
      />
    </EffectComposer>
  )
}

function Delorean() {
  const horizontalSpeedMax = speeds.deloreanHorizontalSpeedMax;
  const verticalSpeedMax = speeds.deloreanVerticalSpeedMax;  
  const [horizontalSpeed, setHorizontalSpeed] = useState(speeds.deloreanInitialHorizontalSpeed);
  const [verticalSpeed, setVerticalSpeed] = useState(speeds.deloreanInitialVerticalSpeed);

  const barrierX = 10
  const barrierYTop = -20
  const barrierYBot = -10

  const sc = useLoader(GLTFLoader,deloreansilver).scene;
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

  useFrame((state, delta) => {
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
    sc.translateZ(horizontalSpeed * delta * 60); 
    sc.translateX(verticalSpeed * delta * 60); /*COMMENT OUT FOR NO ARROW CONTROL*/
  });
  return <primitive object={sc} position={[0, 0, -8]} rotation={[0,(-Math.PI/2),0]} scale={[4,4,4]}/>
}

function Moutains() {
  const sc = useLoader(GLTFLoader,mountains).scene;
  return <primitive object={sc} position={[5,3,-200]} rotation={[0,-Math.PI/2,0]} scale={[60,50,56]}/>
}


/* CAMERA MOVEMENT */
const cameraShift = (camera, b) => {
  // Use a tunable speed for smoothness
  const shift = speeds.cameraShiftSpeed ?? 0.08; // Lower = smoother
  let moved = false;
  // Smoothly interpolate each axis using lerp
  camera.position.x += (b.x - camera.position.x) * shift;
  camera.position.y += (b.y - camera.position.y) * shift;
  camera.position.z += (b.z - camera.position.z) * shift;
  // Consider as moved if any axis is not close enough
  if (Math.abs(camera.position.x - b.x) > 0.01 || Math.abs(camera.position.y - b.y) > 0.01 || Math.abs(camera.position.z - b.z) > 0.01) {
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
  const sc = useLoader(GLTFLoader,aboutneonsign).scene;
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
  const sc = useLoader(GLTFLoader,projectneonsign).scene;
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
  const sc = useLoader(GLTFLoader,experienceneonsign).scene;
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
  const angleAmount = speeds.monolithAngleAmount ?? 0.01;
  const colorChangeInterval = speeds.monolithColorChangeIntervalMs ?? 1000;
  const initialColor = speeds.monolithInitialColor ?? 0x00fc0d;
  const baseScale = speeds.monolithScale ?? 0.7;
  const position = speeds.monolithPosition ?? [0, 25, -140];
  const rotation = speeds.monolithRotation ?? [Math.PI/2,0,0];

  const sphere = useRef();
  const oldTime = useRef(Date.now());
  const scaleRef = useRef(baseScale);
  useFrame((state, delta) => {
    let pl = sphere.current;
    // Use delta for frame-rate independent rotation
    pl.rotation.y += angleAmount * delta * 60;
    pl.rotation.z += angleAmount * delta * 60;
    pl.rotation.x += angleAmount * delta * 60;
    // Cyclic scale animation over 2 seconds
    const t = state.clock.getElapsedTime();
    const scaleAnim = baseScale + 0.1 * Math.abs(Math.sin((Math.PI * t) / 1)); // 2s period
    pl.scale.set(scaleAnim, scaleAnim, scaleAnim);
    // Use state.clock for frame-rate independent color change
    if(state.clock.getElapsedTime() * 1000 - oldTime.current > colorChangeInterval){
      oldTime.current = state.clock.getElapsedTime() * 1000;
      pl.material.color.setHex(randomColourGenerator());
    }
  });
  return (
    <line ref={sphere} userData={{ test: "hello" }} position={position} rotation={rotation}>
      <sphereGeometry attach="geometry" args={[radius, resolution, resolution]} />
      <lineBasicMaterial attach="material" color={initialColor}  linewidth={1} />
    </line>
  );
}

/* FLOOR PLANE */
function MovingPlane() {
  //Color choices: CE13D1, 42FFFF
  const [speed, setSpeed] = useState(speeds.floorPlaneSpeed)
  let floorPlane = useRef();
  useFrame((state, delta) => {
    if(floorPlane.current.position.z > (2000/2)-500){
      floorPlane.current.position.z = 0;
    }else if(floorPlane.current.position.z < -2000/2){
      setSpeed(-speed);
    }
    floorPlane.current.translateY(speed * delta * 60)
    });
  return (
    <line ref={floorPlane} userData={{ test: "hello" }} position={[0,0,0]} rotation={[Math.PI/2,0,0]}>
      <planeGeometry attach="geometry" args={[2000, 2000, 100, 100]} />
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
            {true ?  <BloomEffect /> : <></>}
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
  // Always use the current window aspect ratio
  const [aspect, setAspect] = React.useState(window.innerWidth / window.innerHeight);

  React.useEffect(() => {
    const handleResize = () => {
      setAspect(window.innerWidth / window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="mainCanvas" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      zIndex: 0,
      background: 'black',
      overflow: 'hidden',
    }}>
      <Canvas
        camera={{
          fov: 75,
          aspect: aspect,
          near: 0.1,
          far: 300,
          position: [posO.x, posO.y, posO.z],
          rotation: [100, 0, 0]
        }}
        gl={{ antialias: true }}
        style={{ width: '100vw', height: '100vh', display: 'block' }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(new THREE.Color('#000000'));
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          camera.rotation.set(0, 0, 0);
        }}
      >
        <MainScene api={api} />
      </Canvas>
    </div>
  );
}

export default SynthwaveBackground;
