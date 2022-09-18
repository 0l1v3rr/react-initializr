import { FC, FormEvent } from "react";
import { Package } from "../../types";

import { useSetRecoilState } from "recoil";
import { packagesArrayState } from "../../atoms";

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

  const handleCheckboxChange = (e: FormEvent<HTMLInputElement>) => {
    const isChecked = (e.target as HTMLInputElement).checked;

    setPackageArray((prev) => {
      const res: Package[] = [];

      for (const p of prev) {
        if (
          p.packageName.toLowerCase() ===
          props.package.packageName.toLowerCase()
        ) {
          res.push({
            description: p.description,
            isDev: isChecked,
            packageName: p.packageName,
            removeable: p.removeable,
            version: p.version,
          });
          continue;
        }
        res.push(p);
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
          <span className="font-light text-zinc-400 text-base italic">
            {" "}
            ({props.package.version}) {!props.package.removeable && "(Default)"}
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
                onChange={handleCheckboxChange}
                checked={props.package.isDev}
              />
              <span className="text-zinc-400">Dev dependency: </span>
              <span
                className="w-4 h-4 border-2 border-zinc-800 rounded-sm relative
                  cursor-pointer hover:bg-white/[0.04] hover:border-zinc-700
                  transition-all duration-300 shadow-sm peer-checked:bg-zinc-800
                  peer-checked:rotate-180 peer-checked:scale-110 peer-checked:border-zinc-600 
                  before:absolute before:content[''] before:bg-green-500 before:w-[1px]
                  before:h-[90%] before:rotate-45 before:top-1/2 before:left-1/2
                  before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-0
                  after:absolute after:content[''] after:bg-green-500 after:w-[1px]
                  after:h-[90%] after:rotate-[135deg] after:top-1/2 after:left-1/2
                  after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0
                  peer-checked:before:opacity-100 peer-checked:after:opacity-100
                  before:transition-all after:transition-all before:duration-300 
                  after:duration-300"
              />
            </label>
          </div>

          <button
            onClick={handleDeleteClick}
            className="font-semibold px-4 border-2 
            border-solid border-zinc-800 rounded-md flex items-center 
            justify-center gap-2 leading-7 transition-all hover:scale-[103%] 
            hover:shadow-md text-[1em] text-red-400 hover:bg-white/[0.04] 
            hover:border-zinc-700"
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
