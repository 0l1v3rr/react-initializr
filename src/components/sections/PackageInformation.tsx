import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { convertToKebabCase } from "../../utils";
import Input from "../inputs/Input";

import {
  nameState,
  versionState,
  descriptionState,
  gitRepoState,
  authorState,
  homepageState,
} from "../../atoms";

const PackageInformation = () => {
  // default form values with recoil states
  const [name, setName] = useRecoilState(nameState);
  const [version, setVersion] = useRecoilState(versionState);
  const [description, setDescription] = useRecoilState(descriptionState);
  const [gitRepo, setGitRepo] = useRecoilState(gitRepoState);
  const [author, setAuthor] = useRecoilState(authorState);
  const [homepage, setHomepage] = useRecoilState(homepageState);

  // overriding the state value if the query param is not null
  useEffect(() => {
    // parsing the query parameters
    const params = new URLSearchParams(window.location.search);

    const pName = params.get("name");
    const pVersion = params.get("version");
    const pDescription = params.get("description");
    const pRepo = params.get("repository");
    const pAuthor = params.get("author");
    const pHomepage = params.get("homepage");

    if (pName !== null) setName(pName);
    if (pVersion !== null) setVersion(pVersion);
    if (pDescription !== null) setDescription(pDescription);
    if (pRepo !== null) setGitRepo(pRepo);
    if (pAuthor !== null) setAuthor(pAuthor);
    if (pHomepage !== null) setHomepage(pHomepage);
  }, []);

  // converting the name into kebab-case
  useEffect(() => setName((prev) => convertToKebabCase(prev)), [name]);

  // hotkeys
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
        case "L":
          setName("my-project");
          setVersion("1.0.0");
          setDescription("");
          setGitRepo("");
          setAuthor("");
          setHomepage("");
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
    <section className="mt-5 flex flex-col gap-2">
      <div className="font-semibold italic">Project information</div>

      <Input
        label="Name"
        placeholder="my-project"
        type="text"
        value={name}
        setValue={setName}
        required={true}
      />

      <Input
        label="Description"
        placeholder="This is my super cool project."
        type="text"
        value={description}
        setValue={setDescription}
        required={false}
      />

      <Input
        label="Version"
        placeholder="1.0.0"
        type="text"
        value={version}
        setValue={setVersion}
        required={true}
      />

      <Input
        label="Author"
        placeholder="John Doe"
        type="text"
        value={author}
        setValue={setAuthor}
        required={false}
      />

      <Input
        label="Homepage"
        placeholder="https://username.github.io/project"
        type="text"
        value={homepage}
        setValue={setHomepage}
        required={false}
      />

      <Input
        label="Git Repository"
        placeholder="https://github.com/username/my-repository"
        type="url"
        value={gitRepo}
        setValue={setGitRepo}
        required={false}
      />
    </section>
  );
};

export default PackageInformation;
