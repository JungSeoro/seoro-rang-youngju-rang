import React, {useState,useEffect} from 'react';
import ConceptVideoMp4 from "./resource/concept_10.mp4";

import './font.css'
import './Concept_10.css'

function Concept_10() {

let top=0;
const appStyle={
  display:"flex",
  flexDirection: "column"
}

const parallaxStyle={
  width:"100%",
  height:"100%",
  position:"absolute",
  top:0
}
const videoMainStyle={
  position:"absolute",
  height:"20%",
  left:`calc(50% + ${top}px)`,
  top:0
}
const landingStyle={
  width:"100%",
  height:"100%",
  position:"absolute",
}

const backgroundStyle={
  position:"absolute",
  width:"100%",
  height:"100%",
  background:"#FBF3EC",
  opacity:0.5
}

const videoBackgroundStyle={
  objectFit:"cover",
  position:"absolute",
  width:"100%",
  height:"100%",
  left:0,
  top:0,
  opacity:1,
  background:"black"
}

const title={
  position:"absolute",
  color:"white",
  fontFamily:"Arita-dotum-Medium",
  fontWeight:100
}

const Transition=document.getElementsByClassName("Transition");
const setTransition=(e)=>{
  console.log(Transition);
  e.preventDefault();
  Transition[0].classList.add("reveal");
}

const transitionBtn={
  zIndex:1,
  position:"absolute",
  top:"0",
  width:"10%",
  height:"10%"
}

const tempScroll={
width:"10px",
top:"0",
height:"5000px",
position:"absolute"
}

return (
    <div className="Concept_10" style={appStyle}>
      <div style={tempScroll}></div>
      <div style={landingStyle}>
      <video className="tempVideo" style={videoBackgroundStyle} preload="auto"muted="muted" autoPlay={true} >
        {/* <source src={ConceptVideoMp4} type="video/mp4" /> */}
      </video>
      </div>
      <div className="Transition3 reveal3"></div>
      <div className="Transition2 reveal2"></div>
      <div className="Transition reveal"></div>
      <button style={transitionBtn} onClick={(e)=>setTransition(e)}>hi</button>
    </div>
  );
}

export default Concept_10;
