import { ReactElement, FC } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface DotfilePopupProps {
  children: ReactElement;
  isActive: boolean;
  closePopup: () => void;
  dotfileName: string;
}

const DotfilePopup: FC<DotfilePopupProps> = (props) => {
  const activeClasses = "opacity-100 pointer-events-auto scale-100";
  const inactiveClasses = "opacity-0 pointer-events-none scale-0";

  return (
    <div
      className={`border-2 bg-zinc-900 border-solid border-zinc-800 rounded-md 
        shadow-lg left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 select-none 
        transition-all duration-300 fixed top-1/2 max-h-[95vh] overflow-y-auto w-[90%] 
        sm:w-[80%] md:w-[70%] lg:w-[60%] ${
          props.isActive ? activeClasses : inactiveClasses
        }`}
    >
      <div className="flex px-4 py-2 border-b-2 border-zinc-800 justify-between">
        <div className="text-lg font-semibold">{props.dotfileName}</div>

        <button
          className="scale-110 color-react-hover transition 
          duration-100 hover:scale-125 text-lg"
          onClick={props.closePopup}
        >
          <IoCloseOutline />
        </button>
      </div>

      {props.children}
    </div>
  );
};

export default DotfilePopup;
