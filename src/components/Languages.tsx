import RadioInput from "./RadioInput";
import { languageState, packagesArrayState } from "../atoms";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import { Package } from "../types";

const Languages = () => {
  const tsPackages = [
    "typescript",
    "@types/node",
    "@types/react",
    "@types/react-dom",
  ];

  // parsing the query parameters
  const params = new URLSearchParams(window.location.search);
  const languageParam = params.get("language");

  // states
  const [language, setLanguage] = useRecoilState(languageState);
  const setPackageArray = useSetRecoilState(packagesArrayState);

  useEffect(() => {
    if (languageParam?.toLowerCase() === "typescript") {
      setLanguage("TypeScript");
    }
  }, []);

  // reacting to the language state change
  useEffect(() => {
    // if the language is javascript
    if (language.toLocaleLowerCase() === "javascript") {
      // then we remove every ts package
      setPackageArray((prev) =>
        prev.filter((p) => !tsPackages.includes(p.packageName))
      );

      // else (if the langauge is typescript)
    } else {
      // then we append the ts packages
      for (const p of tsPackages) {
        axios.get(`https://registry.npmjs.org/${p}/latest`).then((res) => {
          // creating the package from the result
          const r: Package = {
            packageName: res.data.name,
            description: res.data.description,
            removeable: false,
            version: res.data.version,
            isDev: false,
          };

          // appending it to our packages array
          setPackageArray((prev) => [...prev, r]);
        });
      }
    }
  }, [language]);

  return (
    <section>
      <div className="font-semibold italic">Language</div>
      <form className="flex flex-col mt-1">
        <RadioInput
          checked={
            languageParam === null ||
            languageParam.toLowerCase() === "javascript"
          }
          state={languageState}
          formName="language"
          value="JavaScript"
        />

        <RadioInput
          checked={languageParam?.toLowerCase() === "typescript"}
          formName="language"
          value="TypeScript"
          state={languageState}
        />
      </form>
    </section>
  );
};

export default Languages;
