<h3 align="center">
  Classificados
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/PauloFRPDev/classificados">

  <a href="https://www.linkedin.com/in/paulo-felippe-ribeiro-pinheiro/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Paulo%20Felippe-%23FF9000">
  </a>

  <a href="https://github.com/PauloFRPDev/classificados/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/PauloFRPDev/classificados">
  </a>

  <a href="https://github.com/PauloFRPDev/classificados/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/PauloFRPDev/classificados?color=%23FF9000">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/PauloFRPDev/classificados?color=%23FF9000">
</p>

<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

</br>

## 💇🏻‍♂️ About the project

This is an api made with Node.js and express to a project for the company I work for. It is an online classified ads for the dental class where anyone who has a dentist's license can submit a text in one of the existing categories (office hours rent, equipment sale, donations, ...).

Here, you can find the Web Client under construction for this project: [Web](https://github.com/PauloFRPDev/classificados-web)

## 🚀 Technologies

Technologies that I used to develop this web client

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bcryptjs](https://github.com/kelektiv/node.bcrypt.js#readme)
- [Cors](https://github.com/expressjs/cors)
- [Date-fns](https://date-fns.org/)
- [Dotenv](https://github.com/motdotla/dotenv#readme)
- [Express](https://expressjs.com/pt-br/)
- [Helmet](https://helmetjs.github.io/)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Typeorm](https://typeorm.io/#/)

## 💻 Getting started

### Requirements

- Have yarn or npm installed

**Clone the project and access the folder**

```bash
$ git clone https://github.com/PauloFRPDev/classificados.git && cd classificados
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn or npm run

# Change ormconfig.json and .env files with your database and environment settings

# After database is created - run migrations
$ yarn typeorm migration:run or npm run typeorm migration:run

# Start the server
$ yarn dev:server or npm run dev:server
```

## 🤔 How to contribute

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork PauloFRPDev/classificados
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd classificados

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made by Paulo Felippe 👋 [See my linkedin](https://www.linkedin.com/in/paulo-felippe-ribeiro-pinheiro/)
