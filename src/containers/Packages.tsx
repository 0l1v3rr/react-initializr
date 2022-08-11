import Button from "../components/Button";
import Title from "../components/Title";

import { FiPackage } from 'react-icons/fi';
import { useRecoilValue } from "recoil";

import { packagesArrayState } from "../atoms";
import PackageItem from "../components/PackageItem";
import { useState } from "react";
import BlurOverlay from "../components/BlurOverlay";
import PackagesPopup from "../components/PackagesPopup";

const Packages = () => {
  const packageArray = useRecoilValue(packagesArrayState);
  const [isPackagePopupActive, setIsPackagePopupActive] = useState(false);
  
  return (
    <div className="flex flex-col md:w-[50%] w-full md:px-10 px-5 py-5 min-h-full">
      <Title text="Packages" />
      
      <BlurOverlay isActive={isPackagePopupActive} />
      <PackagesPopup isActive={isPackagePopupActive} closePopup={() => setIsPackagePopupActive(false)} />

      <div className="text-base block pb-2 border-b-2 border-solid border-zinc-800 mb-1">
        <Button 
          icon={FiPackage}
          onClick={() => setIsPackagePopupActive(true)}
          text="Search for packages"
        />
      </div>

      {packageArray.map(p => <PackageItem key={p.packageName} package={p} />)}
    </div>
  );
}

export default Packages;