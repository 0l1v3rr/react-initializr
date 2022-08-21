import { atom } from "recoil"
import { Package } from "./types"

export const nameState = atom({
  key: "name",
  default: "my-project",
})

export const versionState = atom({
  key: "version",
  default: "1.0.0",
})

export const descriptionState = atom({
  key: "description",
  default: "",
})

export const gitRepoState = atom({
  key: "gitRepo",
  default: "",
})

export const authorState = atom({
  key: "author",
  default: "",
})

export const licenseState = atom({
  key: "license",
  default: "MIT",
})

export const languageState = atom({
  key: "language",
  default: "JavaScript",
})

export const pmState = atom({
  key: "pm",
  default: "npm",
})

export const packagesArrayState = atom({
  key: "packagesArray",
  default: [] as Package[],
})
