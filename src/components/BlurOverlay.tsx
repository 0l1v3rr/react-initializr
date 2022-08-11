const BlurOverlay = (props: { isActive: boolean }) => {
  return (
    <div className={`w-screen h-screen fixed top-0 left-0 transition-all duration-300 
      z-20 ${props.isActive ? "backdrop-blur-sm" : "pointer-events-none"}`} />
  );
}

export default BlurOverlay