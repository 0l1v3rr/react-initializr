import { FC, useState } from "react";
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

  return (
    <div
      className={`w-full border-2 border-solid border-zinc-800 my-1 shadow-sm 
      rounded-md cursor-pointer transition-all duration-100 hover:border-zinc-700 
      hover:bg-zinc-800 hover:scale-[101%] ${isAdded && "hidden"} flex`}
      onClick={() => {
        setPackageArray((prev) => [...prev, props.package]);
        setIsAdded(true);
        props.onClick();
      }}
    >
      <div className="border-r-2 border-zinc-800 px-2 py-1 flex items-center justify-center">
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
