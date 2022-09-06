import { FC } from "react";
import { Package } from "../types";

import { AiOutlineDelete } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { packagesArrayState } from "../atoms";
import HoverContainer from "./HoverContainer";

interface PackageItemProps {
  package: Package;
}

const PackageItem: FC<PackageItemProps> = (props) => {
  const setPackageArray = useSetRecoilState(packagesArrayState);

  const handleDeleteClick = () => {
    setPackageArray((prev) => {
      const res: Package[] = [];

      for (const p of prev) {
        if (
          p.packageName.toLowerCase() !==
          props.package.packageName.toLowerCase()
        ) {
          res.push(p);
        }
      }

      return res;
    });
  };

  return (
    <div className="w-full border-2 border-solid border-zinc-800 my-1 shadow-sm px-3 py-1 rounded-md">
      <div className="flex items-center justify-between">
        <a
          href={`https://www.npmjs.com/package/${props.package.packageName}`}
          rel="noreferrer"
          target="_blank"
          className="text-lg text-zinc-200 
          font-semibold color-react-hover transition-all duration-100"
        >
          {props.package.packageName}
          <span className="font-light text-zinc-400 text-base">
            {" "}
            ({props.package.removeable ? props.package.version : "Default"})
          </span>
        </a>
      </div>

      <div className="text-zinc-400 align-justify text-base italic">
        {props.package.description}
      </div>

      {props.package.removeable && (
        <div
          className="border-t-2 border-solid border-zinc-800 mt-2 flex 
          items-center gap-2 justify-between text-sm pt-2 pb-1"
        >
          <div
            className="pl-3 pr-2 py-1 border-2 border-solid border-zinc-800 
            rounded-md flex items-center gap-2"
          >
            <label className="flex relative items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="absolute opacity-0 w-0 h-0 peer"
              />
              <span className=" text-zinc-400">Dev dependency: </span>
              <span
                className="w-4 h-4 border-2 border-zinc-800 rounded-sm 
                  cursor-pointer hover:bg-white/[0.04] hover:border-zinc-700
                  transition-all duration-300 shadow-sm peer-checked:bg-zinc-800
                  peer-checked:rotate-180 peer-checked:scale-110 
                  peer-checked:border-zinc-600"
              />
            </label>
          </div>

          <button
            onClick={handleDeleteClick}
            className="font-semibold px-4 border-2 
            border-solid border-zinc-800 rounded-md flex items-center 
            justify-center gap-2 leading-7 transition-all hover:scale-[103%] 
            hover:shadow-md text-[1em] text-red-400 hover:bg-white/[0.04] 
            hover:border-zinc-700 hover:text-red-500"
            aria-label={`Delete package ${props.package.packageName}`}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default PackageItem;
