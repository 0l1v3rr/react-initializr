import { BsFileZip } from 'react-icons/bs'
import { BiCopy } from 'react-icons/bi'
import { FiGithub } from 'react-icons/fi'

import { useRecoilValue } from "recoil";
import { 
  nameState, 
  versionState, 
  descriptionState, 
  gitRepoState, 
  authorState, 
  licenseState,
  languageState,
  packagesArrayState
} from "../atoms";

import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { useState } from 'react';

const Header = () => {
  const [copyText, setCopyText] = useState("Copy Link");
  
  const name = useRecoilValue(nameState);
  const version = useRecoilValue(versionState);
  const description = useRecoilValue(descriptionState);
  const gitRepo = useRecoilValue(gitRepoState);
  const author = useRecoilValue(authorState);
  const license = useRecoilValue(licenseState);
  const language = useRecoilValue(languageState);
  const packages = useRecoilValue(packagesArrayState);

  const copyLink = () => {
    // building the URL to copy
    const params = new URLSearchParams();

    // only append if the current value is not empty
    if(name.trim() !== "") params.append("name", name);
    if(version.trim() !== "") params.append("version", version);
    if(description.trim() !== "") params.append("description", description);
    if(gitRepo.trim() !== "") params.append("repository", gitRepo);
    if(author.trim() !== "") params.append("author", author);
    if(license.trim() !== "") params.append("license", license);
    params.append("language", language);
    params.append("packages", packages.map(p => p.packageName).join(";"));

    let domain = "http://localhost:3000";
    // let domain = "https://0l1v3rr.github.io/react-initializr";
    let url = `${domain}?${params.toString()}`;

    // copying the url to the clipboard
    navigator.clipboard.writeText(url);

    // changing the button text for 1000 ms
    setCopyText("Copied❗");
    setTimeout(() => setCopyText("Copy Link"), 1000);
  };

  return (
    <div className="flex items-center justify-center md:justify-between w-full h-fit border-b-2 border-solid 
      border-zinc-800 sm:px-12 px-4 py-4 sticky top-0 bg-zinc-900 shadow-md z-10">
      <div className="items-center text-2xl gap-2 cursor-pointer md:flex hidden">
        <img 
          className="w-12 animate-spin-slow" 
          src={`${process.env.PUBLIC_URL}/logo512.png`} 
          alt="React Logo" 
        />

        <div className="flex items-center gap-1 font-semibold">
          <span className="color-react">React</span>
          <span>Initializr</span>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <Button
          text="Generate ZIP"
          icon={BsFileZip}
          onClick={() => {}}
        />

        <Button
          text={copyText}
          icon={BiCopy}
          onClick={copyLink}
        />

        <div className="hidden sm:block">
          <ButtonLink
            text="Source"
            icon={FiGithub}
            to="https://github.com/0l1v3rr/react-initializr"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;