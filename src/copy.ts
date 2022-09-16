import { Dispatch, SetStateAction } from "react";
import { Project } from "./types";

export const copyLink = (
  setCopyText: Dispatch<SetStateAction<string>>,
  p: Project
) => {
  const {
    description,
    version,
    language,
    author,
    gitRepo,
    homepage,
    name,
    packages,
  } = p;

  // building the URL to copy
  const params = new URLSearchParams();

  // only append if the current value is not empty
  if (name.trim() !== "") params.append("name", name);
  if (version.trim() !== "") params.append("version", version);
  if (description.trim() !== "") params.append("description", description);
  if (gitRepo.trim() !== "") params.append("repository", gitRepo);
  if (author.trim() !== "") params.append("author", author);
  if (homepage.trim() !== "") params.append("homepage", homepage);
  params.append("language", language);

  const nonDefaultPackages = [...packages].filter((p) => p.removeable);
  if (nonDefaultPackages.length > 0) {
    let packagesString: string = "";
    for (const i of nonDefaultPackages) {
      packagesString += `${i.packageName},dev=${i.isDev ? "y" : "n"};`;
    }

    // remove the last character from the result (a semicolon)
    packagesString = packagesString.slice(0, -1);

    params.append("packages", packagesString);
  }

  // let domain = "http://localhost:3000";
  let domain = "https://0l1v3rr.github.io/react-initializr";
  let url = `${domain}?${params.toString()}`;

  // copying the url to the clipboard
  navigator.clipboard.writeText(url);

  // changing the button text for 1000 ms
  setCopyText("Copied❗");
  setTimeout(() => setCopyText("Copy Link"), 1000);
};
