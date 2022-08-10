import { atom } from "recoil";

export const nameState = atom({
    key: "name",
    default: "my-project"
});

export const versionState = atom({
    key: "version",
    default: "1.0.0"
});

export const descriptionState = atom({
    key: "description",
    default: ""
});

export const gitRepoState = atom({
    key: "gitRepo",
    default: ""
});

export const authorState = atom({
    key: "author",
    default: ""
});

export const licenseState = atom({
    key: "license",
    default: "MIT"
});

export const languageState = atom({
    key: "language",
    default: "JavaScript"
});

export const templateState = atom({
    key: "template",
    default: "create-react-app"
});