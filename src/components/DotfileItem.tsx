import { FC, useState, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { dotfilesState } from "../atoms";
import { VscCode } from "react-icons/vsc";
import HoverContainer from "./HoverContainer";
import DotfilePopup from "./DotfilePopup";
import BlurOverlay from "./BlurOverlay";
import { readDotfile } from "../dotfiles";

interface DotfileItemProp {
  dotfile: string;
  isSelected: boolean;
}

const DotfileItem: FC<DotfileItemProp> = (props) => {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [dotfileContent, setDotfileContent] = useState("");
  const [isSelected, setIsSelected] = useState(props.isSelected);
  const setDotfiles = useSetRecoilState(dotfilesState);

  // close the popup when clicking the Esc key
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.isComposing || event.repeat) {
      return;
    }

    if (event.key === "Escape") {
      setIsPopupActive(false);
      return;
    }
  }, []);

  // add the keydown event listener
  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const handleItemClick = () => {
    setIsSelected((prev) => !prev);

    setDotfiles((prev) => {
      // remove from the dotfiles array
      if (prev.includes(props.dotfile)) {
        return [...prev].filter((i) => i !== props.dotfile);
      }

      // add to the dotfiles array
      return [...prev, props.dotfile];
    });
  };

  useEffect(() => {
    (async () => {
      const res = await readDotfile(props.dotfile);
      setDotfileContent(res.toString());
    })();
  }, []);

  return (
    <div
      className={`text-[.9rem] text-center border-2 transition-all duration-300
      ${isSelected ? "border-zinc-600 shadow-md" : "border-zinc-800"} 
      ${!isSelected && "hover:border-zinc-700 hover:text-zinc-300"}
      ${isSelected && "color-react"} rounded-md pl-4 cursor-pointer 
      leading-none flex items-center`}
    >
      <BlurOverlay
        isActive={isPopupActive}
        closePopup={() => setIsPopupActive(false)}
      />
      <DotfilePopup
        isActive={isPopupActive}
        closePopup={() => setIsPopupActive(false)}
        dotfileName={props.dotfile}
      >
        <div className="px-4 py-2 flex flex-col gap-1 items-start">
          {dotfileContent.split("\n").map((line) => {
            return (
              <div
                key={`${line}+${Math.random()}`}
                className={`${
                  line.startsWith("#") || line.startsWith("//")
                    ? "text-zinc-400 mt-1"
                    : "text-zinc-200"
                } font-mono`}
              >
                {line}
              </div>
            );
          })}
        </div>
      </DotfilePopup>

      <div
        className={`py-2 border-r-2 border-zinc-800 pr-2 w-full
        ${isSelected ? "border-zinc-600 shadow-md" : "border-zinc-800"}
        transition-all duration-300`}
        onClick={handleItemClick}
      >
        {props.dotfile}
      </div>

      <HoverContainer hoverText="Source">
        <div
          className="h-full text-zinc-300 ml-auto px-2 items-center 
          flex justify-center text-lg color-react-hover transition-all 
          duration-300 hover:scale-105"
          onClick={() => setIsPopupActive(true)}
        >
          <VscCode />
        </div>
      </HoverContainer>
    </div>
  );
};

export default DotfileItem;
