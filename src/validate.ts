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
  if (!name.match(/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/gi)) {
    return {
      isValid: false,
      errorMessage:
        "The Name should be kebab-case and longer than 3 characters.",
    };
  }

  // if the homepage is not valid
  if (homePage.trim() !== "") {
    if (
      !homePage
        .trim()
        .match(
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
        )
    ) {
      return {
        isValid: false,
        errorMessage: "The Homepage should be a valid URL.",
      };
    }
  }

  if (gitRepo.trim() !== "") {
    if (
      !gitRepo
        .trim()
        .match(
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)(\.git)/gi
        )
    ) {
      return {
        isValid: false,
        errorMessage:
          "Git Repository should be a valid URL that ends with '.git'.",
      };
    }
  }

  // if everything is valid
  return {
    isValid: true,
    errorMessage: null,
  };
};
