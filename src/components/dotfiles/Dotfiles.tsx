import { useRecoilState } from "recoil";
import { dotfiles } from "../../dotfiles";
import DotfileItem from "./DotfileItem";
import { dotfilesState } from "../../atoms";
import { useEffect, useCallback } from "react";

const Dotfiles = () => {
  const [dotfilesArray, setDotfilesArray] = useRecoilState(dotfilesState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dotfilesParam = params.get("dotfiles");

    setDotfilesArray(
      dotfilesParam !== null ? dotfilesParam.split(";") : [".gitignore"]
    );
  }, []);

  const isDotfileSelected = useCallback(
    (dotfile: string): boolean => {
      return dotfilesArray.includes(dotfile.toLowerCase());
    },
    [dotfilesArray]
  );

  return (
    <section className="mt-3 flex flex-col gap-2">
      <div className="font-semibold italic w-full flex items-end gap-1">
        <span>Select Dotfiles </span>
        <span className="text-base text-zinc-500 italic">
          ({dotfilesArray.length} selected)
        </span>
      </div>

      <div className="grid sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 grid-cols-2 gap-2">
        {dotfiles.map((dotfile) => {
          return (
            <DotfileItem
              dotfile={dotfile}
              key={dotfile}
              isSelected={isDotfileSelected(dotfile)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Dotfiles;
