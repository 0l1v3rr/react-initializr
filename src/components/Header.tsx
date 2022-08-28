import { BsFileZip } from "react-icons/bs";
import { BiCopy } from "react-icons/bi";
import { FiGithub } from "react-icons/fi";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { useCallback, useEffect, useState } from "react";
import BlurOverlay from "./BlurOverlay";
import ErrorPopup from "./ErrorPopup";
import { generateZip } from "../generate";
import { copyLink } from "../copy";

import { useRecoilValue } from "recoil";
import {
  nameState,
  versionState,
  descriptionState,
  gitRepoState,
  authorState,
  licenseState,
  languageState,
  packagesArrayState,
  homepageState,
} from "../atoms";

const Header = () => {
  // recoil states
  const name = useRecoilValue(nameState);
  const version = useRecoilValue(versionState);
  const description = useRecoilValue(descriptionState);
  const gitRepo = useRecoilValue(gitRepoState);
  const author = useRecoilValue(authorState);
  const license = useRecoilValue(licenseState);
  const language = useRecoilValue(languageState);
  const packages = useRecoilValue(packagesArrayState);
  const homepage = useRecoilValue(homepageState);

  const [isValidatingPopupOpen, setIsValidatingPopupOpen] = useState(false);

  const [copyText, setCopyText] = useState("Copy Link");
  const [genereateText, setGenerateText] = useState("Generate ZIP");

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
          callGenerateZip();
          break;
        case "C":
          callCopyLink();
          break;
        case "S":
          window.open("https://github.com/0l1v3rr/react-initializr", "_blank");
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

  const callGenerateZip = () => {
    generateZip(setGenerateText, setIsValidatingPopupOpen, {
      name: name,
      version: version,
      description: description,
      gitRepo: gitRepo,
      language: language,
      author: author,
      license: license,
      homepage: homepage,
      packages: packages,
    });
  };

  const callCopyLink = () => {
    copyLink(setCopyText, {
      name: name,
      version: version,
      description: description,
      gitRepo: gitRepo,
      language: language,
      author: author,
      license: license,
      homepage: homepage,
      packages: packages,
    });
  };

  return (
    <header
      className="flex items-center justify-center md:justify-between w-full h-fit border-b-2 border-solid 
      border-zinc-800 sm:px-12 px-4 py-4 sticky top-0 bg-zinc-900 shadow-md z-10"
    >
      <BlurOverlay isActive={isValidatingPopupOpen} />
      <ErrorPopup
        isActive={isValidatingPopupOpen}
        closePopup={() => setIsValidatingPopupOpen(false)}
        message="The name of the project cannot be blank."
      />

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
          text={genereateText}
          icon={BsFileZip}
          onClick={callGenerateZip}
        />

        <Button text={copyText} icon={BiCopy} onClick={callCopyLink} />

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
