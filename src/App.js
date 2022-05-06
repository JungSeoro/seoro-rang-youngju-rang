import React, {useState,useEffect,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import { ReactComponent as IconPlaceWhite } from "./resource/icon_place_white.svg";

import './font.css'
import './LandingPage.css'
import { useScrollEvent } from './useScrollEvent';
import { checkInViewport } from './checkInViewport';

function App() {
  const [animation, setAnimation] = useState(true);
  const areaRef = useRef();
  const handleScrollAnimation = () => {
    document.body.style.setProperty(
      "--scroll",
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    );
    const elementTop = areaRef?.current?.getBoundingClientRect().top;
    // setAnimation(checkInViewport(areaRef.current));
    console.log("scroll");
  };

  useScrollEvent(handleScrollAnimation);

  let vh = 0;
  useEffect(()=>{
    document.title = "서로랑 영주랑"
    document.querySelector('meta[name="theme-color"]').setAttribute('content', "black");
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // window.scrollTo(0, 500);
    // const fullscreen = element => {
      // if (element.requestFullscreen) return element.requestFullscreen()
      // if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
      // if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
      // if (element.msRequestFullscreen) return element.msRequestFullscreen()
    // }
    // 
    // const exitFullScreen = () => {
      // if (document.exitFullscreen) return document.exitFullscreen()
      // if (document.webkitCancelFullscreen) return document.webkitCancelFullscreen()
      // if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
      // if (document.msExitFullscreen) return document.msExitFullscreen()
    // }
  });


let top=0;
// const appStyle={
//   display:"flex",
//   flexDirection: "column"
// }

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
    <div className="App">
      <div style={tempScroll}></div>
      <div className="wrapper-landing">
        <video className="landing-video" preload="auto" muted="muted" autoPlay={false} >
          {/* <source src={ConceptVideoMp4+"#t=9"} type="video/mp4" /> */}
        </video>
        <div className="landing-gradient"></div>
        <div className="landing-main">
          <div className="main-title">
            <p className="title-main">서로랑 영주랑</p>
            <p className="title-sub">결혼을 합니다.</p>
          </div>
          <div className="main-info">
            <div className="info-place">
              <IconPlaceWhite className="place-img"></IconPlaceWhite>
              <p className="place-text">서울웨딩타워</p>
            </div>
            <div className="info-date">
              <IconPlaceWhite className="date-img"></IconPlaceWhite>
              <p className="date-text">6월 19일</p>
            </div>
            <p className="info-dday">D-30</p>
          </div>
        </div>
        {/* <div className="Transition Transition6"></div> */}
        {/* <div className="Transition Transition5"></div> */}
        <div className="landing-transition landing-transition4"></div>
        <div className="landing-transition landing-transition3"></div>
        <div className="landing-transition landing-transition2"></div>
        <div ref={areaRef} animation="true" className="landing-transition landing-transition1"></div>
        {/* <button style={transitionBtn} onClick={(e)=>setTransition(e)}>hi</button> */}
      </div>
    </div>
  );
}

export default App;