import { useEffect } from "react";

const BlurOverlay = (props: { isActive: boolean }) => {
  useEffect(() => {
    if (props.isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [props.isActive]);

  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 transition-all duration-300 
      z-20 ${props.isActive ? "backdrop-blur-sm" : "pointer-events-none"}`}
    />
  );
};

export default BlurOverlay;
