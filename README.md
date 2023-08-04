<!-- # To Set up ISI-Survey App

This app hash an admin page to manage the survey and generate public link for user to survey.

### Server-Side

- Node.js (My local machine is versoin 18.12.1)
- Express.js (Use for API)
- MongoDB (Use for Database)
- Mongoose (Use for easily modeling data)

### Front-End

- React.js
- JavaScript
- React-Bootstrap Components

### Authentication

- JWT

### Set Up for Local Development

1. Clone this project
2. `npm i`
3. Create Mongo Atlas Account and create a database
4. Add `.env` file with these following values
   - NODE_ENV=
   - PORT=
   - MONGO_URI=

# App screenshots


# ISI Survey Application

<!-- [![CircleCI Build Status](https://img.shields.io/circleci/build/gh/uswds/uswds/develop?style=for-the-badge&logo=circleci)](https://circleci.com/gh/uswds/uswds/tree/develop) ![Snyk vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@uswds/uswds?style=for-the-badge) [![npm Version](https://img.shields.io/npm/v/@uswds/uswds?style=for-the-badge)](https://www.npmjs.com/package/uswds) [![npm Downloads](https://img.shields.io/npm/dt/@uswds/uswds?style=for-the-badge)](https://www.npmjs.com/package/uswds) [![GitHub issues](https://img.shields.io/github/issues/uswds/uswds?style=for-the-badge&logo=github)](https://github.com/uswds/uswds/issues) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4?style=for-the-badge)](https://github.com/prettier/prettier) -->

![Snyk vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@ISI-Survey/Punvireakroth?style=for-the-badge) [![npm Version](https://img.shields.io/npm/v/@ISI-Survey/Punvireakroth?style=for-the-badge)](https://www.npmjs.com/package/Punvireakroth)

This project is a survey application built using the MERN stack (MongoDB, Express, React, and Node.js). The application allows users to create surveys, answer surveys, and view survey results.

Admin users can also perform CRUD (create, read, update, delete) operations on surveys and keep track of survey results.

## Contents

- [Application Screens](#application-screens)
- [What's included in ISI-Survey](#whats-included-in-isi-survey)
  - [Directory structure](#directory-structure)
  - [Package contents](#package-contents)
- [ISI Survey API](#isi-survey-api)
- [Installing the project](#installing-the-design-system)
  - [Requirement](#requirement)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Licenses and attribution](#licenses-and-attribution)
- [Contributing](#contributing)

## Application Screens

Login page
<img src='readme-assets\login_page.png'>
Register page
<img src='readme-assets\register_page.png'>
Admin dashboard page
<img src='readme-assets\admin_dashboard_page.png'>
User Dashboard page
<img src='readme-assets\user_dashboard_page.png'>
Survey page
<img src='readme-assets\survey_page.png'>
Thank you page
<img src='readme-assets\thank_you_page.png'>
Create survey page (for Admin only)
<img src='readme-assets\create_survey_page.png'>
Data grid page (Visible for Admin only)
<img src='readme-assets\data_page.png'>
Delete Survey Modal
<img src='readme-assets\delete_survey_screen.png'>
Edit Survey
<img src='readme-assets\edit_survey_page.png'>
Survey responses page
<img src='readme-assets\survey_response_page.png'>

## What's included in ISI-Survey

The ISI Survey includes two main folders, `client` and `server`. The directories that live in the the `client` is those responsible for what the user see and interact with. Conversely the diectories that live in the `server` are api and logic that interact with database.

- **package.json** : Since this project is uses node package manager (`npm`) we will see package.json file in client and server directory that contains metadata such as name, version, dependencies, scripts (used to build and run the project).

- **Fonts** In this project we used Google font. There are two fonts we are using those are `open sans` for English text and `nokora` for Khmer font.

- **Images** and icons are located in: `client/src/assets`.

- **Icons** for icons we are using [bootstrap-icons](https://react-icons.github.io/react-icons/icons?name=bs) icons for the components. For favicons is located in `client/public/favicon.ico`.

### Technologies

#### Frontend

- React
- ReactGlobalContext
- JavaScript
- React-Bootstrap
- MUI datagrid

#### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Directory structure

Here's what you can expect to find inside the ISI survey.

```
[isi-survey]
├── client/
│   ├── public/
│   │   └── media
│   ├── src/
│   │   ├── assets/
│   │   │   ├── isi_logo.svg
│   │   │   └── ThankYou.png
│   │   ├── components/
│   │   │   ├── boilerplate/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Spinner.jsx
│   │   │   └── Survey/
│   │   │       ├── createQuestionComponents.jsx
│   │   │       ├── CreateSurvey.jsx
│   │   │       ├── displayQuestionComponents.jsx
│   │   │       ├── DisplayResult.jsx
│   │   │       ├── displayResultComponents.jsx
│   │   │       ├── DisplaySurvey.jsx
│   │   │       ├── DisplaySurveyList.jsx
│   │   │       └── SurveySubmit.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── hooks/
│   │   │   ├── useAuthContext.js
│   │   │   ├── useLogin.js
│   │   │   ├── useLogout.js
│   │   │   └── useSignup.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Welcome.jsx
│   │   ├── utils/
│   │   │   ├── findInputError.js
│   │   │   └── isFormInvalid.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── server/
│   ├── controllers/
│   │   ├── questionController.js
│   │   ├── surveyController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── questionModel.js
│   │   ├── surveyModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── questions.js
│   │   ├── surveys.js
│   │   └── users.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
└── README.md
```

### Package contents

Here's what you can expect to find in each of the directories and files in the ISI Survey project:

---

- `/client`: contain the required directories and files for the user.
- `/client/public`: You can find the favicon and SPA `index.html`
- `/client/src`: contain the app page, components, hooks, boilerplate, context, utils directories, as well as other necessary files for front-end.
- `/client/README.md`: Front-End documents

---

- `/server` : contain the required directories and file for API and database interactions.
- `/server/controller` handling the incoming requests from the client.

## ISI Survey API

- API for survey results
  - This api need token authorization
    `localhost:5000/api/surveys`

## Installing the project

### Requirement

Project can be install using `git commands`, `Node` and `npm`

- `git` and `github`:
  - You will need to register `SSH` key with your github account.
  - One more method is to simply signin to your github account during the project cloning.
- `node js`:
  - During the current development my node version is `v18.12.1`
- `npm`
  - You'll need `npm`, It will be come out of the box

### Setup for Local development

1. Clone this project using git
2. Use `npm install` for the three main directories

- `cd client && npm install`
- `cd server && npm install`
- `cd .. && npm install`

3. Create Mongo Atlas account.

- Create a new Database
- Get the database URI

4. Create a new `.env` file

- DB_URI=
- PORT=
- JWT_SECRET=

5. Go to root directory

- Run `npm run dev`

## Licenses and attribution

## Contributing

# ISI-Survey App User Documentation

## Introduction

This application allows users to create surveys, answer surveys, and view survey results. **Admin** users have additional features like managing surveys and tracking survey results.

This user documentation will guide you through the process of, logging in, creating surveys, answering surveys, and viewing survey results.

## Contents

- [User Roles](#user-roles)
- [Register and Logging In](#register-and-logging-in)
- [Creating Surveys](#creating-surveys)
- [Answering Surveys](#answering-surveys)
- [Viewing Survey Results](#viewing-surveys-results)

### User Roles

There are two roles in this project **User Admin** and **Normal User**

- **User Admin** Be able to create, delete, update, Taking surveys and see user responses.
  <img src='readme-assets\admin_dashboard_page.png'>

- **Normal User** Be able to taking survey that created by admin.
  <img src='readme-assets\user_dashboard_page.png'>

### Register and Logging In

1. Open your web browser and enter the URL of the ISI-Survey App.
2. On the login page, enter your username and password.
3. Click on the "Login" button to log in.

   <img src='readme-assets\login_page.png'>

### Creating Surveys

If you are an admin user, you can create surveys using the ISI-Survey App. Follow these steps to create a survey:

1. Log in to the ISI-Survey App using your credentials
2. Once logged in, you will be redirected to the admin dashboard.
3. On the admin dashboard, click on the "Create Survey" button.
4. Enter a title for the survey in the provided field.
5. Add questions to the survey by clicking on the "add question" button.
6. Choose the type of each question (e.g short response, paragraph, true/false) also in that options there a `new section` for creating a new section for the survey.
7. Repeat step 5 and 6 to add more questions to the survey.
8. Click on the `Save and Finish Survey` to save the survey.
   <img src='readme-assets\create_survey_page.png'>

### Answering Surveys

To answer a survey using the ISI-Survey App, follow these steps:

1. Log in to the ISI-Survey App using your credentials.
2. Once logged in, you will be redirected to the user dashboard.
3. On the user dashboard, you will see a list of available surveys.
4. Click on the survey you want to answer.
5. Read the instructions and qustions carefully.
6. Select the appropriate answers or provide text inputs as required.
7. Click on the "Submit" button to submit your survey responses.
   <img src='readme-assets\survey_page.png'>

Viewing Survey Results

Admin users can view the results of the surveys using the ISI-Survey App. To view survey results, follow these steps:

1. Log in to the ISI-Survey App using your admin credentials.
2. Once logged in, you will be redirected to the admin dashboard.
3. On the admin dashboard, you will `Survey data` button to show responses as data-grid and `See all respones` to show data as table and pie chart for True/False question.
4. The survey results will be displayed, showing the responses for each question.
   <img src='readme-assets\survey_response_page.png'>
   <img src='readme-assets\data_page.png'>

### Conclusion

Congratulations!🎈🥳 You have successfully set up the ISI-Survey App, logged in, created surveys, answered surveys, and viewed survey results. If you have any further questions or issues, please contact the me for assistance. Enjoy using the ISI-Survey App!
