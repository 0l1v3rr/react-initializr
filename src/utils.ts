import axios from "axios";

export const convertToKebabCase = (s: string): string =>
  s.toLowerCase().split(" ").join("-");

export const readRemoteFile = async (url: string) => {
  let res = "";
  await axios.get(url).then((r) => (res = r.data));
  return res;
};

export const getLatestDependencyVersion = async (name: string) => {
  let version = "";

  await axios.get(`https://registry.npmjs.org/${name}/latest`).then((res) => {
    version = res.data.version;
  });

  return version;
};
