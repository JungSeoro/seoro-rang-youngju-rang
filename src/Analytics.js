import {useEffect} from "react";
import ReactGA from "react-ga";

const Analytics = () => {
  const pathName = window.location.pathname;
  useEffect(() => {
    if(process.env.NODE_ENV === "production") {
      ReactGA.initialize("UA-229745602-1");
      ReactGA.set({page: pathName});
      ReactGA.pageview(pathName);
    }
 }, [pathName]);
  return <></>;
}

export default Analytics;