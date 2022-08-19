<h1> 

📦 React Initializr <a href="https://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="Pull Requests"></a> <a href="https://github.com/0l1v3rr/react-initializr/releases"><img src="https://img.shields.io/github/release/0l1v3rr/react-initializr.svg" alt="Relase"></a>

</h1>

- [❓ What is React Initializr?](#-what-is-react-initializr)
- [❗ Important](#-important)
- [📚 Teach stack](#-teach-stack)
- [⚒️ Building from source](#️-building-from-source)
- [🐋 Building with Docker](#-building-with-docker)
- [📝 License](#-license)
- [🧑‍🤝‍🧑 Contributing](#-contributing)
- [💡 Inspiration](#-inspiration)

<hr>

## ❓ What is React Initializr?
<a href="https://0l1v3rr.github.io/react-initializr/" target="_blank">React Initializr</a> is a simple, easy-to-use, web-based, boilerplate-free project generator.  

Generate modern <a href="https://reactjs.org/" target="_blank">React</a> templates without barely touching the terminal - just fill in some input fields, add your beloved dependencies, and generate your project!  

You can browse amongst every available npm package thanks to the <a href="https://github.com/npm/registry" target="_blank">NPM Registry API</a>.

If you prefer to use **TypeScript** you can totally do that too, just select the `TypeScript` option before generating the project. The site will add all the necessary dependencies and files, you don't have to do anything else.  

Share your project with others - if you're about to create a tutorial, a blog, a course, or something that requires sharing your *"starting point"* with others, just click on the **"Copy Link"** button. If anyone opens that link, they can download the same exact project you created. Therefore you can almost skip the "generating project" phase.  
**Example:** [https://0l1v3rr.github.io/react-initializr?name=my-project&version=1.0.0&description=This+is+my+cool+project&language=TypeScript&packages=axios%3Breact-icons%3Breact-router](https://0l1v3rr.github.io/react-initializr?name=my-project&version=1.0.0&description=This+is+my+cool+project&language=TypeScript&packages=axios%3Breact-icons%3Breact-router)

<img src="./images/screenshot_1.png" alt="Screenshot">

<hr>

## ❗ Important
* The site generates a ZIP file. Just unzip it, `cd` to the folder (`cd my-project`), and run the command `npm i`. If you've successfully done this, you're good to go.  

* You can find the boilerplate-free templates [here]([./templates](https://github.com/0l1v3rr/react-initializr/tree/master/templates)). The site uses these as a base to generate your next project! ;)  
***Note: The template is a transformed [create-react-app](https://create-react-app.dev/) template.***

<hr>

## 📚 Teach stack
Shout-out to the creators for creating these tools:
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React-Icons](https://react-icons.github.io/react-icons/)
- [Axios](https://github.com/axios/axios)
- [File-Saver](https://github.com/eligrey/FileSaver.js/)
- [JSZip](https://stuk.github.io/jszip/)
- [Recoil](https://recoiljs.org/)
- [Tailwind](https://tailwindcss.com/)
- [React GH Pages](https://github.com/gitname/react-gh-pages)

<hr>

## ⚒️ Building from source
If you don't have NodeJS, [download and install it](https://nodejs.org/en/).  
Then open a terminal and type these commands:
```sh
# 1. Clone the project:
git clone https://github.com/0l1v3rr/react-initializr.git
cd react-initializr

# 2. Install the dependencies:
npm i

# 3. Run the application:
npm start
``` 

<hr>

## 🐋 Building with Docker
If you don't have Docker, make sure to [install it](https://www.docker.com/get-started/).  
After cloning the repository, make the project's root directory active in your terminal and type these commands:
```sh
# 1. Build the Docker image
npm run docker:build

# 2. Docker tag (basically naming the image)
npm run docker:tag

# 3. Run the image
npm run docker:run

# Last, (Optional): Remove the image if you're done
npm run docker:clean
```

<hr>

## 📝 License
This project is licensed under the [MIT License](LICENSE).

<hr>

## 🧑‍🤝‍🧑 Contributing
Every contribution is welcomed.  
You can find a contributing guideline [here](CONTRIBUTING.md).

<hr>

## 💡 Inspiration
I was inspired by [start.spring.io](https://start.spring.io/), check it out as well. :*