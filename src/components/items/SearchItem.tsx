import { FC, useState, useEffect, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { packagesArrayState } from "../../atoms";
import { Package } from "../../types";

interface PackageItemProps {
  package: Package;
  onClick: () => void;
  n: number;
}

const SearchItem: FC<PackageItemProps> = (props) => {
  const setPackageArray = useSetRecoilState(packagesArrayState);
  const [isAdded, setIsAdded] = useState(false);

  const onItemClick = () => {
    setPackageArray((prev) => [...prev, props.package]);
    setIsAdded(true);
    props.onClick();
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.isComposing || event.repeat) {
      return;
    }

    // if the target is an input, we should not trigger the event
    if ((event.target as HTMLElement).tagName.toUpperCase() === "INPUT") {
      return;
    }

    if (event.key == `${props.n}`) {
      onItemClick();
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div
      className={`w-full border-2 border-solid border-zinc-800 my-1 shadow-sm 
      rounded-md cursor-pointer transition-all duration-100 hover:border-zinc-700 
      hover:bg-zinc-800 hover:scale-[101%] ${isAdded && "hidden"} flex group`}
      onClick={() => onItemClick()}
    >
      <div
        className="border-r border-zinc-800 px-2 py-1 flex items-center 
        justify-center group-hover:border-zinc-700 transition-all duration-100"
      >
        {props.n}.
      </div>

      <div className="px-2 py-1">
        <div className="flex items-center justify-between">
          <div className="text-lg text-zinc-200 font-semibold">
            {props.package.packageName}
            <span className="font-light text-zinc-400 text-base">
              {" "}
              ({props.package.version})
            </span>
          </div>
        </div>

        <div className="text-zinc-400 align-justify text-base italic">
          {props.package.description}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
