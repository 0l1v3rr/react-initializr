import { FC } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface PopupProps {
  isActive: boolean;
  closePopup: () => void;
  message: string;
}

const ErrorPopup: FC<PopupProps> = (props) => {
  const activeClasses = "opacity-100 pointer-events-auto scale-100";
  const inactiveClasses = "opacity-0 pointer-events-none scale-0";

  return (
    <div
      className={`border-2 bg-zinc-900 border-solid border-zinc-800 rounded-md 
      shadow-lg left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 select-none 
      transition-all duration-150 fixed top-1/2 max-h-[95vh] overflow-y-auto w-[95%] 
      sm:w-[60%] md:w-[50%] lg:w-[30%] ${
        props.isActive ? activeClasses : inactiveClasses
      }`}
    >
      <div
        className="border-b-2 border-solid border-zinc-800 flex items-center 
        justify-between gap-32 px-4 py-2"
      >
        <div className="font-semibold text-lg flex-nowrap">Error</div>

        <button
          className="scale-110 color-react-hover transition 
          duration-100 hover:scale-125"
          onClick={props.closePopup}
        >
          <IoCloseOutline />
        </button>
      </div>

      <div className="px-4 py-2 text-red-400 italic text-center">
        {props.message}
      </div>
    </div>
  );
};

export default ErrorPopup;
