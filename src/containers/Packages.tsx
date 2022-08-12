import Button from "../components/Button";
import Title from "../components/Title";

import { FiPackage } from 'react-icons/fi';
import { useRecoilState } from "recoil";

import { packagesArrayState } from "../atoms";
import PackageItem from "../components/PackageItem";
import { useEffect, useState } from "react";
import BlurOverlay from "../components/BlurOverlay";
import PackagesPopup from "../components/PackagesPopup";
import axios from "axios";
import { Package } from "../types";

const Packages = () => {
  const [packageArray, setPackageArray] = useRecoilState(packagesArrayState);
  const [isPackagePopupActive, setIsPackagePopupActive] = useState(false);

  useEffect(() => {
    setPackageArray([]);

    const params = new URLSearchParams(window.location.search);
    const packagesParam = params.get("packages");
    const packagesToIterate = packagesParam === null ? ["react", "react-scripts"] : packagesParam.split(";");

    for(let i of packagesToIterate) {
      axios.get(`https://registry.npmjs.org/${i}/latest`)
        .then(res => {
          const r: Package = {
            packageName: res.data.name,
            description: res.data.description,
            removeable: false,
            version: res.data.version
          }

          setPackageArray(prev => [...prev, r]);
        });
    }

  }, []);
  
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