import { FC, useState } from "react";
import { useSetRecoilState } from "recoil";
import { dotfilesState } from "../atoms";

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
      className={`text-base text-center border-2 transition-all duration-300
      ${isSelected ? "border-zinc-600 shadow-md" : "border-zinc-800"} 
      ${!isSelected && "hover:border-zinc-700 hover:text-zinc-300"}
      ${isSelected && "color-react"} rounded-md px-2 py-1 cursor-pointer`}
      onClick={handleItemClick}
    >
      {props.dotfile}
    </div>
  );
};

export default DotfileItem;
