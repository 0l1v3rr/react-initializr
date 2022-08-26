import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { convertToKebabCase } from "../utils";
import Input from "./Input";

import {
  nameState,
  versionState,
  descriptionState,
  gitRepoState,
  authorState,
  licenseState,
  homepageState,
} from "../atoms";

const PackageInformation = () => {
  // default form values with recoil states
  const [name, setName] = useRecoilState(nameState);
  const [version, setVersion] = useRecoilState(versionState);
  const [description, setDescription] = useRecoilState(descriptionState);
  const [gitRepo, setGitRepo] = useRecoilState(gitRepoState);
  const [author, setAuthor] = useRecoilState(authorState);
  const [license, setLicense] = useRecoilState(licenseState);
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
    const pLicense = params.get("license");
    const pHomepage = params.get("homepage");

    if (pName !== null) setName(pName);
    if (pVersion !== null) setVersion(pVersion);
    if (pDescription !== null) setDescription(pDescription);
    if (pRepo !== null) setGitRepo(pRepo);
    if (pAuthor !== null) setAuthor(pAuthor);
    if (pLicense !== null) setLicense(pLicense);
    if (pHomepage !== null) setHomepage(pHomepage);
  }, []);

  // converting the name into kebab-case
  useEffect(() => setName(prev => convertToKebabCase(prev)), [name]);

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
        label="Git Repository"
        placeholder="https://github.com/myUsername/my-repository"
        type="url"
        value={gitRepo}
        setValue={setGitRepo}
        required={false}
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
        label="License"
        placeholder="MIT"
        type="text"
        value={license}
        setValue={setLicense}
        required={true}
      />
    </section>
  );
};

export default PackageInformation;
