import { FC } from "react";
import { Package } from "../types";

interface PackageItemProps {
  package: Package,
}

const SearchItem:FC<PackageItemProps> = (props) => {
  return (
    <div className="w-full border-2 border-solid border-zinc-800 my-1 shadow-sm px-3 py-1 rounded-md
      cursor-pointer transition-all duration-100 hover:border-zinc-700 hover:bg-zinc-800">
      <div className="flex items-center justify-between">
        <div className="text-lg text-zinc-200 font-semibold">
          {props.package.packageName} 
          <span className="font-light text-zinc-400 text-base"> ({props.package.version})</span>
        </div>
      </div>

      <div className="text-zinc-400 align-justify text-base italic">
        {props.package.description}
      </div>
    </div>
  );
};

export default SearchItem;