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
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import axios from 'axios';

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

  const generateZip = async () => {
    // creating the ZIP and a folder to append the files
    const zip = new JSZip();
    const project = zip.folder(name);

    // creating the package.json file
    const packageJson = await generatePackageJson()
    project?.file("package.json", packageJson);

    // donwloading the ZIP
    zip.generateAsync({ type: "blob" })
      .then(res => saveAs(res, `${name === "" ? "project" : name}.zip`));
  };

  const generatePackageJson = async () => {
    let dependencies: any = {};

    // adding some libraries manually
    // firstly, finding out the latest version each of them
    let testingJestVersion = await getLatestDependencyVersion("@testing-library/jest-dom");
    let testingReactVersion = await getLatestDependencyVersion("@testing-library/react");
    let testingUserEventVersion = await getLatestDependencyVersion("@testing-library/user-event");

    // then append
    dependencies["@testing-library/jest-dom"] = `^${testingJestVersion}`;
    dependencies["@testing-library/react"] = `^${testingReactVersion}`;
    dependencies["@testing-library/user-event"] = `^${testingUserEventVersion}`;

    // iterating through the packages and adding each of them 
    // to the dependencies
    for(let i of packages) {
      dependencies[i.packageName] = `^${i.version}`;
    }
    
    // package.json object
    const result: any = {
      name: name === "" ? "my-project" : version,
      version: version === "" ? "1.0.0" : version,
      private: true,
      dependencies: dependencies,
      scripts: {
        start: "react-scripts start",
        build: "react-scripts build",
        test: "react-scripts test",
        eject: "react-scripts eject"
      },
      eslintConfig: {
        extends: ["react-app", "react-app/jest"]
      },
    };

    // only append if the current value is not empty
    if(description !== "") result.description = description;
    if(author !== "") result.author = author;
    if(license !== "") result.license = license;

    if(gitRepo !== "") {
      result.repository = {
        type: "git",
        url: gitRepo
      };
      result.bugs = {
        url: `${gitRepo}/issues`
      };
    }

    // converting the object to a JSON
    return JSON.stringify(result);
  }

  const getLatestDependencyVersion = async (name: string) => {
    let version = "";
    
    await axios.get(`https://registry.npmjs.org/${name}/latest`)
      .then(res => {
        version = res.data.version;
      });

    return version;
  }

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
          onClick={generateZip}
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