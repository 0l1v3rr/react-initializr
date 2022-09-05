import axios from "axios";

export const reactColors: string[] = [
  "#fb6161",
  "#fb9461",
  "#fbd761",
  "#d7fb61",
  "#82fb61",
  "#61fb7b",
  "#61fbd7",
  "#61a9fb",
  "#6170fb",
  "#a161fb",
  "#f661fb",
  "#fb61c5",
  "#00c8ff",
];

// function to convert any string into kebab-case
export const convertToKebabCase = (s: string): string =>
  s.toLowerCase().split(" ").join("-");

// function to read a raw file from github
export const readRemoteFile = async (url: string) => {
  let res = "";
  await axios.get(url).then((r) => (res = r.data));
  return res;
};

// function to get the latest stable version of an npm
export const getLatestDependencyVersion = async (name: string) => {
  let version = "";

  await axios.get(`https://registry.npmjs.org/${name}/latest`).then((res) => {
    version = res.data.version;
  });

  return version;
};
