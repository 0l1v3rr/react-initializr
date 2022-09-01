import Button from "../components/Button";

import { FiPackage } from "react-icons/fi";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useRecoilState } from "recoil";

import { packagesArrayState } from "../atoms";
import PackageItem from "../components/PackageItem";
import { useCallback, useEffect, useState } from "react";
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
      "@testing-library/jest-dom",
    ];

    const packages = [...defaultPackages];

    // appending the packages coming from the url
    // if it's null, then we only have the default packages
    if (packagesParam !== null) {
      for (const i of packagesParam.split(";")) {
        packages.push(i);
      }
    }

    for (let i of packages) {
      // fetching the current package from npm registry api
      axios.get(`https://registry.npmjs.org/${i}/latest`).then((res) => {
        // creating the package from the result
        const r: Package = {
          packageName: res.data.name,
          description: res.data.description,
          removeable: !defaultPackages.includes(res.data.name),
          version: res.data.version,
        };

        // appending it to our packages array
        setPackageArray((prev) => [...prev, r]);
      });
    }

    // cleaning up the array
    return () => setPackageArray([]);
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.isComposing || event.repeat) {
      return;
    }

    if(event.key === "Escape") {
      setIsPackagePopupActive(false);
      return;
    }

    // if the target is an input, we should not trigger the event
    if ((event.target as HTMLElement).tagName.toUpperCase() === "INPUT") {
      return;
    }

    // check if the Shift key is pressed
    if (event.shiftKey) {
      switch (event.key) {
        case "P":
          setIsPackagePopupActive((prev) => !prev);
          break;
        case "D":
          setPackageArray((prev) => prev.filter((p) => !p.removeable));
          break;
      }
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <section className="flex flex-col md:w-[50%] w-full md:px-10 px-5 py-5 min-h-full">
      <div
        className="font-semibold my-2 border-b-2 border-solid 
      border-zinc-800 w-full pb-3 text-xl flex items-end gap-1"
      >
        <span>Packages </span>
        <span className="text-base text-zinc-500 italic">
          ({packageArray.filter((p) => p.removeable).length} selected)
        </span>
      </div>

      <BlurOverlay isActive={isPackagePopupActive} />
      <PackagesPopup
        isActive={isPackagePopupActive}
        closePopup={() => setIsPackagePopupActive(false)}
      />

      <div className="text-base pb-2 border-b-2 border-solid border-zinc-800 mb-1 flex gap-2 justify-between">
        <Button
          icon={FiPackage}
          onClick={() => setIsPackagePopupActive(true)}
          text="Search for packages"
        />

        <HoverContainer
          hoverText={
            isDefaultPackagesHidden ? "Show defaults" : "Hide defaults"
          }
        >
          <Button
            icon={isDefaultPackagesHidden ? BsEyeSlash : BsEye}
            onClick={() => setIsDefaultPackagesHidden((prev) => !prev)}
            text=""
          />
        </HoverContainer>
      </div>

      {[...packageArray]
        .sort((a, b) =>
          a.packageName > b.packageName
            ? 1
            : b.packageName > a.packageName
            ? -1
            : 0
        )
        .map((p) => {
          if (isDefaultPackagesHidden && !p.removeable) {
            return null;
          }

          return <PackageItem key={p.packageName} package={p} />;
        })}
    </section>
  );
};

export default Packages;
