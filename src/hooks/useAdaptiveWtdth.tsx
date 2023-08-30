import { useEffect, useState } from "react";

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return width;
}
function useAdaptiveWidth() {
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

export default useAdaptiveWidth;
