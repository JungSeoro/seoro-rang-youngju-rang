import React, {useEffect} from 'react';
import Map from './Map'
import './App.css';
import './font.css'
import { ReactComponent as IconPlaceWhite } from "./resource/icon_place_white.svg";
import { ReactComponent as IconDateWhite } from "./resource/icon_date_white.svg";

import videoLandingBackground from "./resource/video_landing_background.mp4";
import transitionImg from "./resource/burn_texture_30fps_small_white.png"
import { useScrollEvent } from './useScrollEvent';
import Analytics from "./Analytics";
import ReactGA from "react-ga";

function App() {
  document.title = "서로랑 영주랑"
  const dday= Math.ceil((new Date("2022-06-19").getTime() - new Date().getTime())/86400000);
  const tempScroll=document.getElementsByClassName("temp-scroll");
  const wrapperLanding=document.getElementsByClassName("wrapper-landing");
  const wrapperMain=document.getElementsByClassName("wrapper-main");
  const gallerySlider=document.getElementsByClassName("gallery-slider");
  const galleryItem=document.getElementsByClassName("gallery-item");
  const galleryZoom=document.getElementsByClassName("gallery-zoom");
  const zoomWrapper=document.getElementsByClassName("zoom-wrapper");
  const zoomItem=document.getElementsByClassName("zoom-item");
  const thanksTitleMain=document.getElementsByClassName("thanks-title-main");
  const thanksTitleActive=document.getElementsByClassName("thanks-title-active");
  const galleryItemMax=18;
  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

  const clickThanksBtn=(e,btnWho)=>{
    if(e.target.className.includes("thanks-btn-copy")) return;
    e.currentTarget.querySelector('.thanks-btn-row-wrapper').classList.toggle('thanks-btn-row-wrapper-active');
    if(btnWho==="boy") e.currentTarget.classList.toggle("thanks-btn-active-boy");
    else e.currentTarget.classList.toggle("thanks-btn-active-girl");
    let copyItem=e.currentTarget.querySelectorAll('.thanks-btn-copy');
    for(let i =0; i<copyItem.length;i++){
      copyItem[i].classList.toggle("thanks-btn-display");
    }
    ReactGA.event({
      category: "Account",
      action: "Open account " + btnWho,
      label: "Account",
    });
  }

  const clickThanksCopy=(e,accNum)=>{
    if(e.target !== e.currentTarget)return;
    var textarea = document.createElement('textarea');
    textarea.value = accNum;

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999);

    document.execCommand('copy');
    document.body.removeChild(textarea);
    thanksTitleMain[0].style.setProperty("animation-name","thanks-title-main-ani"); 
    thanksTitleActive[0].style.setProperty("animation-name","thanks-title-active-ani"); 

    ReactGA.event({
      category: "Account",
      action: "Copy account" + accNum,
      label: "AccountAccount",
    });
  }

  const handleScrollAnimation = () => {
    document.body.style.setProperty(
      "--scroll",
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    );
    console.log("scroll");
  };
  useScrollEvent(handleScrollAnimation);
  const handleScrollDown=()=>{
    if ( window.getComputedStyle(wrapperMain[0]).getPropertyValue('-webkit-mask-position-x') ==="100%"){
      wrapperMain[0].style.setProperty('position','absolute');
      wrapperMain[0].style.setProperty('top',window.scrollY+'px');
      wrapperMain[0].style.setProperty('-webkit-mask-size',"var(--transition-size-mask) 100%");
      wrapperLanding[0].style.setProperty('display','none');

      window.removeEventListener('scroll', handleScrollDown);
      window.addEventListener('scroll', handleScrollUp);
    }
  }
  const handleScrollUp=()=>{
    if(wrapperMain[0].getBoundingClientRect().top>=0){
      wrapperMain[0].style.setProperty('position','fixed');
      wrapperMain[0].style.setProperty('top','0px');
      wrapperLanding[0].style.setProperty('display','block');
      wrapperMain[0].style.setProperty('-webkit-mask-size',"var(--transition-size-mask) 100vh");
      window.removeEventListener('scroll', handleScrollUp);
      window.addEventListener('scroll', handleScrollDown);
    }
  }
  window.addEventListener('scroll', handleScrollDown);

  const loadGallery=()=>{
    for(var i = 0; i<galleryItemMax;i++){
      galleryItem[i].style.setProperty('background-image','url(/img/profile_'+i+'.jpg)');
      zoomItem[i].style.setProperty('background-image','url(/img/profile_'+i+'.jpg)');
      const itemIndexNow=i;
      galleryItem[i].addEventListener('click',function(e){
        document.body.classList.add('scroll-disable');
        galleryZoom[0].classList.add('gallery-zoom-visible');
        console.log(itemIndexNow);
        zoomWrapper[0].scrollTo(itemIndexNow*(window.innerWidth+20),0);
        for(var i = 0; i<galleryItemMax;i++){
          galleryItem[i].style.setProperty('pointer-events','none');
          // galleryItem[i].classList.add('gallery-item-gooey');
        }
        ReactGA.event({
          category: "Gallery",
          action: "Click gallery " + itemIndexNow,
          label: "Watch Video",
        });
      },false);
    }

    galleryItem[0].style.setProperty('background-position-y','50%');
    galleryItem[2].style.setProperty('background-position-y','20%');
    galleryItem[8].style.setProperty('background-position-y','50%');
    galleryItem[12].style.setProperty('background-position-y','40%');
    galleryItem[13].style.setProperty('background-position-y','100%');
    galleryItem[5].style.setProperty('background-position-x','0%');
    gallerySlider[0].scrollTo(galleryItem[5].getBoundingClientRect().width * .4 ,0);
  }

  const customPrevent=(e)=>{console.log("before");e.preventDefault();console.log("after")}

  const clickZoomClose=(e)=>{
    document.body.classList.remove('scroll-disable');
    for(var i = 0; i<galleryItemMax;i++){
      galleryItem[i].style.setProperty('pointer-events','all');
    }
    galleryZoom[0].classList.remove('gallery-zoom-visible');

    ReactGA.event({
      category: "Gallery",
      action: "Close gallery",
      label: "Gallery",
    });
  }

  const clickZoomNext=(e)=>{
        let zoomPreIndex =zoomWrapper[0].scrollLeft + window.innerWidth;
        if(zoomPreIndex>=window.innerWidth*galleryItemMax) zoomPreIndex=0;
        zoomWrapper[0].scrollTo( zoomPreIndex,0);

        ReactGA.event({
          category: "Gallery",
          action: "Next gallery",
          label: "Gallery",
        });
  }

  const clickZoomPre=(e)=>{
        let zoomPreIndex =zoomWrapper[0].scrollLeft - window.innerWidth;
        if(zoomPreIndex<0) zoomPreIndex=window.innerWidth*galleryItemMax;
        zoomWrapper[0].scrollTo( zoomPreIndex,0);

        ReactGA.event({
          category: "Gallery",
          action: "Pre gallery",
          label: "gallery",
        });
  }

  let vh = 0;
  let vhf = 0;
  useEffect(()=>{
    vh = window.innerHeight * 0.01;
    vhf = window.innerHeight;
    document.body.style.setProperty('--vh', `${vh}px`);
    document.body.style.setProperty('--vhf', `${vhf}px`);
    tempScroll[0].style.setProperty('height', 
      window.getComputedStyle(wrapperMain[0]).getPropertyValue('height')
    );
    thanksTitleMain[0].addEventListener("animationend", function(e) {
      thanksTitleMain[0].style.setProperty("animation-name",""); 
    });
    thanksTitleMain[0].addEventListener("animationend", function(e) {
      thanksTitleActive[0].style.setProperty("animation-name",""); 
    });

    loadGallery();
  });

return (
    <div className="App">
      <Analytics />
      <div className="temp-scroll"></div>
      <div className="wrapper-landing">
        <video className="landing-video" playsInline preload="auto" muted="muted" autoPlay={true} loop={true}>
          <source src={videoLandingBackground} type="video/mp4" />
        </video>
        <div className="landing-gradient"></div>
        <div className="landing-main">
          <div className="main-title">
            <p className="title-main">서로랑 영주랑</p>
            <p className="title-sub">결혼을 합니다</p>
          </div>
          <div className="main-info">
            <div className="info-place">
              <IconPlaceWhite className="place-img"></IconPlaceWhite>
              <p className="place-text">서울웨딩타워</p>
            </div>
            <div className="info-date">
              <IconDateWhite className="date-img"></IconDateWhite>
              <p className="date-text">6/19 1시20분</p>
            </div>
            <p className="info-dday">D-{dday}</p>
          </div>
          <div className="landing-arrow-wrapper">
            <span className="landing-arrow-text">천천히 올려보세요</span>
            <div className="landing-arrow"></div>
            <div className="landing-arrow"></div>
            <div className="landing-arrow"></div>
            <div className="landing-arrow"></div>
          </div>
        </div>
        <img className="landing-transition" src={transitionImg}></img>
      </div>
      <div className="wrapper-main transition">
        <div className="main-background-color"></div>
        <div className="main-greetings">
          <div className="greetings-floral"></div>
          <p className="greetings-title">결혼합니다</p>
          <p className="greetings-text">
            겨울의 끝과, 여름의 시작이 만나
            <br></br>두사람의 봄을 맞이하려 합니다.<br></br>
            <br></br>함께하는 네번째 여름,
            <br></br>평생의 약속을 꽃 피우려 하니
            <br></br>따뜻한 유월의 햇살처럼<br></br>
            <br></br>축복과 격려로 저희를 비추어 주시면
            <br></br>사랑 속에 만개하는 모습으로 보답하겠습니다.
          </p>
          <p className="greetings-name">정문한<span className="greetings-name-dot">&#8226;</span>이성재<span className="greetings-name-sub"> 의&nbsp;&nbsp;장남</span> 정서로
          <br></br>소영선<span className="greetings-name-dot">&#8226;</span>차유민<span className="greetings-name-sub"> 의&nbsp;&nbsp;장녀</span> 소영주</p>
        </div>
        <div className="main-gallery">
          <p className="gallery-title">갤러리</p>
          <div className="gallery-slider">
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-item"></div>
            <div className="gallery-scroll">
              <div className="gallery-scroll-arrow">
              <div className="landing-arrow-wrapper gallery-scroll-left">
                <div className="landing-arrow gallery-scroll-arrow"></div>
                <div className="landing-arrow gallery-scroll-arrow"></div>
                <div className="landing-arrow gallery-scroll-arrow"></div>
              </div>
              </div>
              <div className="gallery-scroll-arrow">
              <div className="landing-arrow-wrapper gallery-scroll-right">
                <div className="landing-arrow gallery-scroll-arrow"></div>
                <div className="landing-arrow gallery-scroll-arrow"></div>
                <div className="landing-arrow gallery-scroll-arrow"></div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-calendar">
          <p className="calendar-title">6월 19일</p>
          <p className="calendar-subtitle">일요일 오후 1시 20분</p>
          <div className="calendar-wrapper">
            <ul className="calendar-weekdays">
              <li>일</li>
              <li>월</li>
              <li>화</li>
              <li>수</li>
              <li>목</li>
              <li>금</li>
              <li>토</li>
            </ul>
            <ul className="calendar-days">  
              <li></li>
              <li></li>
              <li></li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li>10</li>
              <li>11</li>
              <li>12</li>
              <li>13</li>
              <li>14</li>
              <li>15</li>
              <li>16</li>
              <li>17</li>
              <li>18</li>
              <li><span className="calendar-active">19</span></li>
              <li>20</li>
              <li>21</li>
              <li>22</li>
              <li>23</li>
              <li>24</li>
              <li>25</li>
              <li>26</li>
              <li>27</li>
              <li>28</li>
              <li>29</li>
              <li>30</li>
              <li>31</li>
            </ul>
          </div>
        </div>
      <div className="main-load">
          <p className="load-title">오시는 길</p>
          <div className="load-title-border">
            <p className="load-hall">서울웨딩타워 2층</p>
            <p className="load-address">서울 송파구 양재대로 932 가락몰 SAFF타워 2층</p>
            <p className="load-address">Tel. 02-463-5000</p>
          </div>
          <div className="load-map">
            <Map></Map>
            <div className="load-map-link" onClick={()=>{
              ReactGA.event({
                category: "Link",
                action: "Open map",
                label: "Map",
              });
              window.open('https://map.naver.com/v5/entry/place/38403565?c=14149984.9381487,4508355.9236996,15,0,0,0,dh', '_blank')
            }} href=''>지도 자세히 보기</div>
          </div>
          <div className="load-transport">
            <div className="transport-title transport-subway">
              <p className="subway-title">지하철</p>
              <p className="transport-main">가락시장역 3,8호선 2번 출구</p>
            </div>
            <div className="transport-title transport-bus">
              <p className="bus-title">버스</p>
              <p className="transport-main">가락시장, 가락시장역 하차 후 도보 3분</p>
            </div>
            <div className="transport-title transport-park">
              <p className="park-title">주차안내</p>
              <p className="transport-main">여유로운 주차 공간이 준비되어 있습니다</p>
              <p className="transport-main">네비게이션에 '서울웨딩타워'를 입력해주세요 </p>
            </div>
          </div>
      </div>
      <div className="main-thanks">
          <div className="thanks-title">
            <p className="thanks-title-main">마음 전하실 곳</p>
            <p className="thanks-title-active">소중한 마음 감사합니다</p>
          </div>
          <div className="thanks-btn" onClick={(e)=>clickThanksBtn(e,"boy")}>
            <div className="thanks-btn-title">신랑측</div>
            <div className="thanks-btn-row-wrapper">
              <div className="thanks-btn-row">
                <p className="thanks-btn-main">
                  정문한
                  <br></br>
                  농협&nbsp;3521401630793
                </p>
                <button onClick={(e)=>clickThanksCopy(e,3521401630793)} className="thanks-btn-copy">복사</button>
              </div>
              <div className="thanks-btn-line"></div>
              <div className="thanks-btn-row">
                <p className="thanks-btn-main">
                  정서로
                  <br></br>
                  신한&nbsp;110296569270&nbsp;&nbsp;
                  </p>
                <button  onClick={(e)=>clickThanksCopy(e,110296569270)} className="thanks-btn-copy">복사</button>
              </div>
            </div>
          </div>
          <div className="thanks-btn" onClick={(e)=>clickThanksBtn(e,"girl")}>
            <div className="thanks-btn-title">신부측</div>
            <div className="thanks-btn-row-wrapper">
              <div className="thanks-btn-row">
                <p className="thanks-btn-main">
                  소영선                  
                  <br></br>
                  농협&nbsp;3010305522111
                </p>
                <button onClick={(e)=>clickThanksCopy(e,3010305522111)} className="thanks-btn-copy">복사</button>
              </div>
              <div className="thanks-btn-line"></div>
              <div className="thanks-btn-row">
                <p className="thanks-btn-main">
                  차유민 
                  <br></br>
                  신한&nbsp;110371401580&nbsp;&nbsp;
                  </p>
                <button  onClick={(e)=>clickThanksCopy(e,110371401580)} className="thanks-btn-copy">복사</button>
              </div>
              <div className="thanks-btn-line"></div>
              <div className="thanks-btn-row">
                <p className="thanks-btn-main">
                  소영주
                  <br></br>
                  하나&nbsp;620240613974&nbsp;&nbsp;
                  </p>
                <button  onClick={(e)=>clickThanksCopy(e,620240613974)} className="thanks-btn-copy">복사</button>
              </div>
            </div>
          </div>
      </div>
      <div className="main-outro">
        <footer> <small>&copy; Copyright 2022, JSR All Rights Reserved.</small> </footer> 
      </div>
      </div>
        <div className="gallery-zoom">
          <div className="zoom-menu">
            <div className="zoom-menu-background">
              <div className="zoom-pre" onClick={(e)=>clickZoomPre(e)}></div>
              <div className="zoom-next" onClick={(e)=>clickZoomNext(e)}></div>
              <div className="zoom-close" onClick={(e)=>clickZoomClose(e)}></div>
            </div>
          </div>
          <div className="zoom-wrapper">
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
            <div className="zoom-item"></div>
          </div>
        </div>
    </div>
  );
}

export default App;