import Button from "../components/Button";
import Title from "../components/Title";

import { FiPackage } from 'react-icons/fi';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useRecoilState } from "recoil";

import { packagesArrayState } from "../atoms";
import PackageItem from "../components/PackageItem";
import { useEffect, useState } from "react";
import BlurOverlay from "../components/BlurOverlay";
import PackagesPopup from "../components/PackagesPopup";
import axios from "axios";
import { Package } from "../types";
import HoverContainer from "../components/HoverContainer";

const Packages = () => {
  const [packageArray, setPackageArray] = useRecoilState(packagesArrayState);
  const [isPackagePopupActive, setIsPackagePopupActive] = useState(false);
  const [isDefaultPackagesHidden, setIsDefaultPackagesHidden] = useState(true);

  useEffect(() => {
    // parsing the query params from the url
    const params = new URLSearchParams(window.location.search);
    const packagesParam = params.get("packages");

    // default packages
    const defaultPackages = [
      "react", 
      "react-scripts", 
      "react-dom", 
      "@testing-library/user-event", 
      "@testing-library/react", 
      "@testing-library/jest-dom"
    ];

    let packages = [...defaultPackages];

    // appending the packages coming from the url
    // if it's null, then we only have the default packages
    if(packagesParam !== null) {
      for(const i of packagesParam.split(";")) {
        packages.push(i);
      }
    }
    
    for(let i of packages) {
      // fetching the current package from npm registry api
      axios.get(`https://registry.npmjs.org/${i}/latest`)
        .then(res => {
          // creating the package from the result
          const r: Package = {
            packageName: res.data.name,
            description: res.data.description,
            removeable: !defaultPackages.includes(res.data.name),
            version: res.data.version
          }

          // appending it to our packages array
          setPackageArray(prev => [...prev, r]);
        });
    }

    // cleaning up the array
    return () => setPackageArray([]);
  }, []);
  
  return (
    <div className="flex flex-col md:w-[50%] w-full md:px-10 px-5 py-5 min-h-full">
      <Title text="Packages" />
      
      <BlurOverlay isActive={isPackagePopupActive} />
      <PackagesPopup isActive={isPackagePopupActive} closePopup={() => setIsPackagePopupActive(false)} />

      <div className="text-base pb-2 border-b-2 border-solid border-zinc-800 mb-1 flex gap-2 justify-between">
        <Button 
          icon={FiPackage}
          onClick={() => setIsPackagePopupActive(true)}
          text="Search for packages"
        />

        <HoverContainer 
          hoverText={isDefaultPackagesHidden ? "Show defaults" : "Hide defaults"}
        >
          <Button 
            icon={isDefaultPackagesHidden ? BsEyeSlash : BsEye}
            onClick={() => setIsDefaultPackagesHidden(prev => !prev)}
            text=""
          />
        </HoverContainer>
      </div>

      {packageArray.map(p => {
        if(isDefaultPackagesHidden && !p.removeable) {
          return null;
        }

        return <PackageItem key={p.packageName} package={p} />
      })}
    </div>
  );
}

export default Packages;