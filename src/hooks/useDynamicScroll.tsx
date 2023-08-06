import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerHeight: height } = window;
  return height;
}
function useDynamicScroll() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}

export default useDynamicScroll;
