import { useRecoilValue } from "recoil";
import { dotfiles } from "../dotfiles";
import DotfileItem from "./DotfileItem";
import { dotfilesState } from "../atoms";
import { useEffect } from "react";

const Dotfiles = () => {
  const dotfilesArray = useRecoilValue(dotfilesState);

  useEffect(() => {
    console.log(dotfilesArray);
  }, [dotfilesArray]);

  return (
    <section className="mt-3 flex flex-col gap-2">
      <div className="font-semibold italic w-full flex items-end gap-1">
        <span>Select Dotfiles </span>
        <span className="text-base text-zinc-500 italic">
          ({dotfilesArray.length} selected)
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {dotfiles.map((dotfile) => {
          return (
            <DotfileItem
              dotfile={dotfile}
              key={dotfile}
              isSelected={dotfilesArray.includes(dotfile)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Dotfiles;
