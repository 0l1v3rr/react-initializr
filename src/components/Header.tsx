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

    const nonDefaultPackages = packages.filter(p => p.removeable);
    if(nonDefaultPackages.length > 0) {
      params.append("packages", nonDefaultPackages.map(p => p.packageName).join(";"));
    }

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

    // public and src folders
    const fpublic = project?.folder("public");
    const fsrc = project?.folder("src");

    // downloading and/or generating the necessary code
    const packageJson = await generatePackageJson();
    const gitignore = await readRemoteFile("https://raw.githubusercontent.com/0l1v3rr/react-initializr/master/templates/cra-js/.gitignore");
    const indexcss = await readRemoteFile("https://raw.githubusercontent.com/0l1v3rr/react-initializr/master/templates/cra-ts/src/index.css");
    const appSrc = await readRemoteFile("https://raw.githubusercontent.com/0l1v3rr/react-initializr/master/templates/cra-ts/src/App.tsx");
    const manifest = await readRemoteFile("https://raw.githubusercontent.com/0l1v3rr/react-initializr/master/templates/cra-js/public/manifest.json");
    const indexhtml = await readRemoteFile("https://raw.githubusercontent.com/0l1v3rr/react-initializr/master/templates/cra-js/public/index.html");
   
    // creating the files and adding it to the zip
    project?.file("package.json", packageJson);
    project?.file("README.md", `# ${name}`);
    project?.file(".gitignore", gitignore);
    fsrc?.file("index.css", indexcss);
    fsrc?.file(language.toLowerCase() === "typescript" ? "App.tsx" : "App.js", appSrc);
    fpublic?.file("manifest.json", manifest);
    fpublic?.file("index.html", indexhtml);
    fpublic?.file("robots.txt", "User-agent: *");

    // if the language is TS
    if(language.toLowerCase() === "typescript") {
      // tsconfig
      const tsconfig = await readRemoteFile("https://raw.githubusercontent.com/0l1v3rr/react-initializr/master/templates/cra-ts/tsconfig.json");
      project?.file("tsconfig.json", tsconfig);

      // index
      const index = await readRemoteFile("https://raw.githubusercontent.com/0l1v3rr/react-initializr/master/templates/cra-ts/src/index.tsx");
      fsrc?.file("index.tsx", index);

    // if the language is not TS (so it's JS)
    } else {
      // index
      const index = await readRemoteFile("https://raw.githubusercontent.com/0l1v3rr/react-initializr/master/templates/cra-js/src/index.js");
      fsrc?.file("index.js", index);
    }

    // donwloading the ZIP
    zip.generateAsync({ type: "blob" })
      .then(res => saveAs(res, `${name === "" ? "project" : name}.zip`));
  };

  const generatePackageJson = async () => {
    let dependencies: any = {};

    // we only append these dependencies if the choosen language is typescript
    if(language.toLowerCase() === "typescript") {
      // adding some libraries manually
      // but firstly, finding out the latest version each of them
      let tsVersion = await getLatestDependencyVersion("typescript");
      let jestVersion = await getLatestDependencyVersion("@types/jest");
      let nodeVersion = await getLatestDependencyVersion("@types/node");
      let reactVersion = await getLatestDependencyVersion("@types/react");
      let reactDomVersion = await getLatestDependencyVersion("@types/react-dom");

      dependencies["typescript"] = `^${tsVersion}`;
      dependencies["@types/jest"] = `^${jestVersion}`;
      dependencies["@types/node"] = `^${nodeVersion}`;
      dependencies["@types/react"] = `^${reactVersion}`;
      dependencies["@types/react-dom"] = `^${reactDomVersion}`;
    }

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

  const readRemoteFile = async (url: string) => {
    let res = "";
    await axios.get(url).then(r => res = r.data);
    return res;
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