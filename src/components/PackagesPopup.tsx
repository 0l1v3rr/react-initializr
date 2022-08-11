import { FC, useState } from "react";

import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import Button from "./Button";
import Input from "./Input";

interface PopupProps {
  isActive: boolean,
  closePopup: () => void
}

const PackagesPopup:FC<PopupProps> = ({ isActive, closePopup }) => {
  const [searchValue, setSearchValue] = useState("");

  const activeClasses = "opacity-100 pointer-events-auto scale-100";
  const inactiveClasses = "opacity-0 pointer-events-none scale-0";

  const handleSearchBtnClick = () => {

  };
  
  return (
    <div className={`border-2 bg-zinc-900 border-solid border-zinc-800 rounded-md shadow-2xl 
      w-fit left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 select-none transition-all  
      duration-300 fixed top-1/2 ${isActive ? activeClasses : inactiveClasses}`}>

      <div className="border-b-2 border-solid border-zinc-800 flex items-center 
        justify-between gap-32 px-4 py-2">
        <div className="font-semibold text-lg flex-nowrap">Search for packages</div>

        <button className="scale-110 color-react-hover transition 
          duration-100 hover:scale-125" onClick={closePopup}>
          <IoCloseOutline />
        </button>
      </div>

      <div className="mt-4 px-4 pb-1 flex items-center gap-2 border-b-2 border-solid 
        border-zinc-800 w-full justify-center">
        <Input 
          label="Search"
          placeholder="react-router"
          required={true}
          type="text"
          value={searchValue}
          setValue={setSearchValue}
        />

        <Button 
          icon={IoSearchOutline}
          onClick={handleSearchBtnClick}
          text=""
        />
      </div>

      <div className="px-4 py-2 w-full">
        <div className="text-center text-zinc-500 text-base">No results found.</div>
      </div>
    </div>
  );
}

export default PackagesPopup;