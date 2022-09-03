import { ValidateResponse } from "./types";

export const validateProject = (
  name: string,
  gitRepo: string,
  homePage: string
): ValidateResponse => {
  // the length of the name is less than 3
  if (name.trim().length < 3) {
    return {
      isValid: false,
      errorMessage:
        "The name should be kebab-case and longer than 3 characters.",
    };
  }

  // kebab-case regex
  if (!name.match(/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/g)) {
    return {
      isValid: false,
      errorMessage:
        "The name should be kebab-case and longer than 3 characters.",
    };
  }

  // if everything is valid
  return {
    isValid: true,
    errorMessage: null,
  };
};
