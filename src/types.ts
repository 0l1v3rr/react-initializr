export interface Package {
  packageName: string;
  description: string;
  version: string;
  removeable: boolean;
  isDev: boolean;
}

export interface Project {
  name: string;
  version: string;
  description: string;
  gitRepo: string;
  author: string;
  license: string;
  language: string;
  packages: Package[];
  homepage: string;
  dotfiles: string[];
}

export interface ValidateResponse {
  isValid: boolean;
  errorMessage: string | null;
}
