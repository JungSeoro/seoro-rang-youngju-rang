import React, {useState,useEffect} from 'react';
import ConceptVideoWebm from "./resource/concept_09.webm";
import ConceptVideoMov from "./resource/concept_09.mov";

import './font.css'

function Concept_09() {

let top=0;
const appStyle={
  display:"flex",
  flexDirection: "column"
}

const backgroundBlur={
  width:"100%",
  height:"100%",
  background:"white",
  position:"absolute",
  top:"0",
  left:"0",
  backdropFilter:"blur(5px)",
  opacity:"0.5",
  display:"none"
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
  opacity:1
}

const title={
  position:"absolute",
  color:"white",
  fontFamily:"Arita-dotum-Medium",
  fontWeight:100
}

return (
    <div className="Concept_09" style={appStyle}>
      <div style={landingStyle}>
      <div style={backgroundStyle}></div>
      <video style={videoBackgroundStyle} preload="auto"muted="muted" autoPlay={true} >
        <source src={ConceptVideoWebm} type="video/webm" />
        <source src={ConceptVideoMov} type="video/mov" />
      </video>
      </div>
      <div style={backgroundBlur}></div>
    </div>
  );
}

export default Concept_09;
