# Final Project 2

## Goal of the project

The goal of this project is to leverage the skills acquired over the last two years and undertake an extensive project reflecting the candidate’s general development capabilities, along with visual and technical skills.

## Table of Contents

- [General Information](#general-information)
- [Project Requirments](#project-requirments)
- [Setup](#setup)
- [How to run the project locally](#how-to-run-the-project-locally)
- [Required Links](#required-Links)
- [Acknowledgement](#acknowledgement)

## General Information

A newly launched accommodation booking site called **Holidaze** has approached you to develop a brand new front end for their application. While they have a list of required features, the design and user experience has not been specified. Working with the official API documentation, plan, design and build a modern front end accommodation booking application.

There are two aspects to this brief: the customer-facing side of the website where users can book holidays at a venue, and an admin-facing side of the website where users can register and manage venues and bookings at those venues.

## Project Requirments

An existing application is responsible for managing all API functionality. Only the front-end application for the API is covered in this project.
The API which are using for this project can be found under Holidaze EndPoints in the [Noroff API documentation](https://content.noroff.dev/project-exam-2/brief.html)

### The following User stories are required

The following user stories were required and are fulfilled:

- A user may view a list of Venues [x]
- A user may search for a specific Venue [x]
- A user may view a specific Venue page by id [x]
- A user may view a calendar with available dates for a Venue [x]
- A user with a stud.noroff.no email may register as a customer [x]
- A registered customer may create a booking at a Venue [x]
- A registered customer may view their upcoming bookings [x]
- A user with a stud.noroff.no email may register as a Venue manager [x]
- A registered Venue manager may create a Venue [x]
- A registered Venue manager may update a Venue they manage [x]
- A registered Venue manager may delete a Venue they manage [x]
- A registered Venue manager may view bookings for a Venue they manage [x]
- A registered user may log in [x]
- A registered user may update their avatar [x]
- A registered user may log out [x]

### The following technical restrictions are required:

- Must use an approved CSS Framework

  - CSS processors
  - [ ] SASS/SCSS
  - [ ] PostCSS
  - CSS frameworks
  - [ ] Bootstrap (>5)`used`
  - [x] Tailwind (>3)
  - [ ] MUI (>5)

- Must be hosted on an approved Static Host

  - Hosting services
    - [ ] GitHub Pages
    - [x] Netlify`used`

- Must use an approved Design Application

  - Design applications
    - [ ] Adobe XD
    - [x] Figma`used`
    - [ ] Sketch

- Must use an approved Planning Application
  - Planning applications
    - [x] Trello`used`
    - [ ] GitHub Projects

## Setups

To start the setup process first opened a project folder in visual studio

`git init`

Installed dependencies

`npm i`

Installed prettier as dev dependency

`npm install --save-dev prettier`

## Testing E2E CYPRESS

The project includes one spec with two tests, login and logout.  
To run tests, first, you need to run the live server. This is done by the following command:

```
npm run start
```

Once the project is running, you can open a second terminal and run the following command :

```
npm run test-e2e
```

The tests should now be running in your terminal and displaying successful 2 out of 2 tests.

#### Available Scripts

This project uses the following scripts:

- `npm start`: Starts the development server.
- `npm build`: Builds the production-ready optimized bundle.
- `npm test`: Runs the test scripts.
- `npm run eject`: Ejects the app from the create-react-app configuration.
- `npm run cypress-test`: Runs the Cypress end-to-end tests.
- `npm run test-e2e`: Opens the Cypress test runner for running end-to-end tests.

## How to run the project locally

First install `npm install -D tailwindcss`
Then open it on the live server by running `npm start`
This should start the server at http://localhost:3000/.

## Required Links

<table>
  <thead>
    <tr>
      <th>Resource</th>
      <td>URL</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Gantt Chart</th>
      <td><a href= "https://ibb.co/YDLzJMz">Gantt Chart Image</a></td>
    </tr>
    <tr>
      <th>Design Prototype</th>
      <td><a href="https://www.figma.com/file/X0ZLpE4bA7Ebajc30U2Xzh/Desktop-Holidayz?type=design&node-id=0%3A1&mode=design&t=QnQPsERYaOg1rL9j-1">Prototype</a> </td>
    </tr>
    <tr>
      <th>Style Guide</th>
      <td><a href="https://www.figma.com/file/Dcc3bnwPiIJzHnkkEi817C/Untitled?type=design&node-id=0%3A1&mode=design&t=g0Vmvgvu6A27mxGV-1">Style Guide</a></td>
    </tr>
    <tr>
      <th>Kanban Board</th>
      <td><a href="https://trello.com/invite/b/imEvvvk7/ATTI3d341f19a0cf8c034c777d9c2adf0e9a336A2E07/accommodationbooking-website">Project Board Link</a></td>
    </tr>
    <tr>
      <th>Repository</th>
      <td><a href="https://github.com/sabaFitwi/holidaze.git">Project Repository</a></td>
    </tr>
    <tr>
      <th>Hosted Demo</th>
      <td><a href="https://lovely-lebkuchen-1efdca.netlify.app/">Live Site</a></td>
    </tr>
  </tbody>
</table>

## Acknowledgements

Noroff Teachers

- Oliver Dipple
- Martin Kruger
- Connor O'Brien

## Author

<h3>saba samuel</h3>
</div>
