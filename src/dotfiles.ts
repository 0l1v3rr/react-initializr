import axios from "axios";

export const dotfiles: string[] = [
  ".dockerignore",
  ".editorconfig",
  ".gitattributes",
  ".gitignore",
  ".prettierignore",
  ".prettierrc.json",
  "postcss.config.js",
  "tailwind.config.js"
];

export const readDotfile = async (dotfile: string): Promise<string> => {
  let res = "";
  await axios
    .get(
      `https://raw.githubusercontent.com/0l1v3rr/react-initializr/master/dotfiles/${dotfile}`
    )
    .then((r) => (res = r.data));
  return res;
};
