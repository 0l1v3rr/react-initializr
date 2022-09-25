import { FC, useState, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { dotfilesState } from "../../atoms";
import { VscCode } from "react-icons/vsc";
import DotfilePopup from "../popups/DotfilePopup";
import BlurOverlay from "../popups/BlurOverlay";
import { readDotfile } from "../../dotfiles";
import HoverContainer from "../hover/HoverContainer";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface DotfileItemProp {
  dotfile: string;
  isSelected: boolean;
}

const DotfileItem: FC<DotfileItemProp> = (props) => {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [dotfileContent, setDotfileContent] = useState("");
  const [isSelected, setIsSelected] = useState(props.isSelected);
  const setDotfiles = useSetRecoilState(dotfilesState);

  useEffect(() => {
    setIsSelected(props.isSelected);
  }, [props.isSelected]);

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
      const converted = res.toString();
      setDotfileContent(
        converted === "[object Object]"
          ? JSON.stringify(res, null, 2)
          : converted
      );
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
        <SyntaxHighlighter
          language="javascript"
          style={atomOneDark}
          showLineNumbers={true}
          customStyle={{
            background: "rgb(24 24 27)",
            textAlign: "left",
            display: "flex",
          }}
          wrapLines={true}
        >
          {dotfileContent}
        </SyntaxHighlighter>
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
