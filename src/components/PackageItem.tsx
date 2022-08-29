import { FC } from "react";
import { Package } from "../types";

import { AiOutlineDelete } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { packagesArrayState } from "../atoms";

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

        {props.package.removeable && (
          <button
            className="transition-all duration-200 hover:text-red-500 cursor-pointer hover:scale-110"
            onClick={handleDeleteClick}
          >
            <AiOutlineDelete />
          </button>
        )}
      </div>

      <div className="text-zinc-400 align-justify text-base italic">
        {props.package.description}
      </div>
    </div>
  );
};

export default PackageItem;
