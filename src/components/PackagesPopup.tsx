import axios from "axios";
import { FC, useEffect, useState } from "react";

import { IoCloseOutline } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { packagesArrayState } from "../atoms";
import Input from "./Input";
import SearchItem from "./SearchItem";

interface PopupProps {
  isActive: boolean;
  closePopup: () => void;
}

const PackagesPopup: FC<PopupProps> = ({ isActive, closePopup }) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPackages, setCurrentPackages] = useState<any[]>([]);

  const packageArray = useRecoilValue(packagesArrayState);

  const activeClasses = "opacity-100 pointer-events-auto scale-100";
  const inactiveClasses = "opacity-0 pointer-events-none scale-0";

  useEffect(() => {
    if (searchValue.length > 3) {
      axios
        .get(
          `https://registry.npmjs.org/-/v1/search?text=${searchValue}&size=10`
        )
        .then((res) => {
          const resArr: any[] = [];

          for (let i of res.data.objects) {
            if (
              !packageArray.map((p) => p.packageName).includes(i.package.name)
            ) {
              resArr.push(i);
            }
          }

          setCurrentPackages(resArr);
        })
        .catch(() => setCurrentPackages([]));
    } else {
      setCurrentPackages([]);
    }
  }, [searchValue]);

  return (
    <div
      className={`border-2 bg-zinc-900 border-solid border-zinc-800 rounded-md 
      shadow-lg left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 select-none 
      transition-all duration-300 fixed top-1/2 max-h-[95vh] overflow-y-auto w-[95%] 
      sm:w-[80%] md:w-[70%] lg:w-[60%] ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      <div
        className="border-b-2 border-solid border-zinc-800 flex items-center 
        justify-between gap-32 px-4 py-2"
      >
        <div className="font-semibold text-lg flex-nowrap">
          Search for packages
        </div>

        <button
          className="scale-110 color-react-hover transition 
          duration-100 hover:scale-125"
          onClick={closePopup}
        >
          <IoCloseOutline />
        </button>
      </div>

      <div
        className="mt-4 px-4 pb-1 flex items-center gap-2 border-b-2 border-solid 
        border-zinc-800 w-full justify-center"
      >
        <Input
          label="Search"
          placeholder="react-router"
          required={true}
          type="text"
          value={searchValue}
          setValue={setSearchValue}
        />
      </div>

      <div className="px-4 py-2 w-full overflow-y-auto flex flex-col">
        {currentPackages.length === 0 && (
          <div className="text-center text-zinc-500 text-base">
            No results found.
          </div>
        )}

        {currentPackages.length !== 0 &&
          currentPackages.map((p) => {
            return (
              <SearchItem
                key={(p as any).package.name}
                package={{
                  packageName: (p as any).package.name,
                  description: (p as any).package.description,
                  removeable: true,
                  version: (p as any).package.version,
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PackagesPopup;
