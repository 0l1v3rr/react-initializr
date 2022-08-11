import { FC } from "react";
import { Package } from "../types";

import { AiOutlineDelete } from 'react-icons/ai';

interface PackageItemProps {
  package: Package,
}

const PackageItem:FC<PackageItemProps> = (props) => {
  return (
    <div className="w-full border-2 border-solid border-zinc-800 my-1 shadow-sm px-3 py-1 rounded-md">
      <div className="flex items-center justify-between">
        <a href={`https://www.npmjs.com/package/${props.package.packageName}`} target="_blank"
          className="text-lg text-zinc-200 font-semibold color-react-hover transition-all duration-100">
          {props.package.packageName} 
          <span className="font-light text-zinc-400 text-base"> ({props.package.version})</span>
        </a>

        <button className={`transition-all duration-200 
          ${props.package.removeable ? "hover:text-red-500 cursor-pointer hover:scale-110" : 
          "text-zinc-500 cursor-not-allowed"}`} disabled={!props.package.removeable}>
          <AiOutlineDelete />
        </button>
      </div>

      <div className="text-zinc-400 align-justify text-base italic">
        {props.package.description}
      </div>
    </div>
  );
}

export default PackageItem;