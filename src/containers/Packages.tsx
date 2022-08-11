import Button from "../components/Button";
import Title from "../components/Title";

import { FiPackage } from 'react-icons/fi';
import { useRecoilState } from "recoil";

import { packagesArrayState } from "../atoms";
import PackageItem from "../components/PackageItem";

const Packages = () => {
  const [packageArray, setPackageArray] = useRecoilState(packagesArrayState);
  
  const handlePackagesBtnClick = () => {

  };

  return (
    <div className="flex flex-col md:w-[50%] w-full md:px-10 px-5 py-5 min-h-full">
      <Title text="Packages" />
      
      <div className="text-base block pb-2 border-b-2 border-solid border-zinc-800 mb-1">
        <Button 
          icon={FiPackage}
          onClick={handlePackagesBtnClick}
          text="Search for packages"
        />
      </div>

      {packageArray.map(p => <PackageItem key={p.packageName} package={p} />)}
    </div>
  );
}

export default Packages;