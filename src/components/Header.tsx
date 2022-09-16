import { BsFileZip } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";
import { FaReact } from "react-icons/fa";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateZip } from "../generate";
import { copyLink } from "../copy";
import { useRecoilValue } from "recoil";
import {
  nameState,
  versionState,
  descriptionState,
  gitRepoState,
  authorState,
  languageState,
  packagesArrayState,
  homepageState,
  dotfilesState,
} from "../atoms";
import { Project } from "../types";
import { reactColors } from "../utils";

const Header = () => {
  // recoil states
  const name = useRecoilValue(nameState);
  const version = useRecoilValue(versionState);
  const description = useRecoilValue(descriptionState);
  const gitRepo = useRecoilValue(gitRepoState);
  const author = useRecoilValue(authorState);
  const language = useRecoilValue(languageState);
  const packages = useRecoilValue(packagesArrayState);
  const homepage = useRecoilValue(homepageState);
  const dotfiles = useRecoilValue(dotfilesState);

  const [copyText, setCopyText] = useState("Copy Link");
  const [genereateText, setGenerateText] = useState("Generate ZIP");

  // a project object to access the newest version of the state without rerendering
  const projectRef = useRef<Project>({
    author: author,
    description: description,
    gitRepo: gitRepo,
    homepage: homepage,
    language: language,
    name: name,
    packages: packages,
    version: version,
    dotfiles: dotfiles,
  });

  // update the project object every time something changes
  useEffect(() => {
    projectRef.current.name = name;
  }, [name]);
  useEffect(() => {
    projectRef.current.version = version;
  }, [version]);
  useEffect(() => {
    projectRef.current.description = description;
  }, [description]);
  useEffect(() => {
    projectRef.current.gitRepo = gitRepo;
  }, [gitRepo]);
  useEffect(() => {
    projectRef.current.author = author;
  }, [author]);
  useEffect(() => {
    projectRef.current.language = language;
  }, [language]);
  useEffect(() => {
    projectRef.current.packages = packages;
  }, [packages]);
  useEffect(() => {
    projectRef.current.homepage = homepage;
  }, [homepage]);
  useEffect(() => {
    projectRef.current.dotfiles = dotfiles;
  }, [dotfiles]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.isComposing || event.repeat) {
      return;
    }

    // if the target is an input, we should not trigger the event
    if ((event.target as HTMLElement).tagName.toUpperCase() === "INPUT") {
      return;
    }

    // check if the Shift key is pressed
    if (event.shiftKey) {
      switch (event.key) {
        case "G":
          generateZip(setGenerateText, projectRef.current);
          break;
        case "C":
          copyLink(setCopyText, projectRef.current);
          break;
        case "S":
          window.open("https://github.com/0l1v3rr/react-initializr", "_blank");
          break;
        case "T":
          document.body.style.setProperty(
            "--react-color",
            reactColors[Math.floor(Math.random() * reactColors.length)]
          );
          break;
        case "R":
          document.body.style.setProperty("--react-color", "#61dafb");
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
    <header
      className="flex items-center justify-center md:justify-between w-full h-fit border-b-2 border-solid 
      border-zinc-800 sm:px-12 px-4 py-4 sticky top-0 bg-zinc-900 shadow-md z-10"
    >
      <div className="items-center text-2xl gap-2 md:flex hidden">
        <div
          className="animate-spin-slow text-5xl cursor-pointer color-react"
          onClick={() => {
            document.body.style.setProperty(
              "--react-color",
              reactColors[Math.floor(Math.random() * reactColors.length)]
            );
          }}
        >
          <FaReact />
        </div>

        <div className="flex items-center gap-1 font-semibold">
          <span className="color-react">React</span>
          <span>Initializr</span>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <Button
          text={genereateText}
          icon={BsFileZip}
          onClick={() => generateZip(setGenerateText, projectRef.current)}
        />

        <Button
          text={copyText}
          icon={BiCopy}
          onClick={() => copyLink(setCopyText, projectRef.current)}
        />

        <div className="hidden sm:block">
          <ButtonLink
            text="Source"
            icon={FiGithub}
            to="https://github.com/0l1v3rr/react-initializr"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
