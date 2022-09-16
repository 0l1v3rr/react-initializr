import { FC, useState } from "react";
import { useSetRecoilState } from "recoil";
import { dotfilesState } from "../atoms";
import { VscCode } from "react-icons/vsc";
import HoverContainer from "./HoverContainer";

interface DotfileItemProp {
  dotfile: string;
  isSelected: boolean;
}

const DotfileItem: FC<DotfileItemProp> = (props) => {
  const [isSelected, setIsSelected] = useState(props.isSelected);
  const setDotfiles = useSetRecoilState(dotfilesState);

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

  return (
    <div
      className={`text-[.9rem] text-center border-2 transition-all duration-300
      ${isSelected ? "border-zinc-600 shadow-md" : "border-zinc-800"} 
      ${!isSelected && "hover:border-zinc-700 hover:text-zinc-300"}
      ${isSelected && "color-react"} rounded-md pl-4 cursor-pointer 
      leading-none flex items-center`}
    >
      <div className={`py-2 border-r-2 border-zinc-800 pr-2 w-full
        ${isSelected ? "border-zinc-600 shadow-md" : "border-zinc-800"}
        transition-all duration-300`}
        onClick={handleItemClick}>
        {props.dotfile}
      </div>

      <HoverContainer hoverText="Source">
        <div className="h-full text-zinc-300 ml-auto px-2 items-center 
          flex justify-center text-lg color-react-hover transition-all 
          duration-300 hover:scale-105">
          <VscCode />
        </div>
      </HoverContainer>
    </div>
  );
};

export default DotfileItem;
