import { useEffect } from "react";
import loaderAnimation from "../../assets/images/Blocks-1s-200px.gif";

// Styles
import "./AppPreloader.css";

const AppPreloader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div id="app-preloader">
      <img src={loaderAnimation} alt="App preloader" />
    </div>
  );
};

export default AppPreloader;
