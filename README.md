# Politico -  Andela Developer Challenge

[![Build Status](https://travis-ci.org/niyobobo/Politico.svg?branch=develop)](https://travis-ci.org/niyobobo/Politico) [![Coverage Status](https://coveralls.io/repos/github/niyobobo/Politico/badge.svg?branch=develop)](https://coveralls.io/github/niyobobo/Politico?branch=develop) [![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/niyobobo/Politico)

# Description

<p>Politico Web Application enables citizens to give their mandate to politicians running for different government offices while building trust in the process through transparency and For another hand there are all the functionality that an administrator could need in order to control the system. Administrator can be able to make all the CRUD operation on each entity (Political party or Governement office).</p> 

<p>On the user side User can show his/her vote a Politian who want to run a certain governement office. And each Politician can express his/her interest to run a certain government office</p>

# Setup
- You need to have `git`, `NodeJS` and `nmp` installed on your local environment.
- Clone the application with `git clone` command.
- `npm install` to install all the dependencies in local environment
- `npm update` to update the dependencies if new version available.

# Dependencies
* `NodeJs` Runtime environment that helps to run JavaScript not only in the browser even on the server.
* `Express` NodeJS framework used for making the back-end.
* `Joi` and `Morgan` API request body error validation and HTTP Request logger respectively.

# Getting Started
Starting application run the following npm scripts
* `npm start` for starting the server.

# Testing
When you need to test the application and view test coverate run:
* `npm test` for running the tests, and getting coverage summary.

# API

* POST `/api/v1/offices` Creating a political office.
* GET `/api/v1/offices` Retreiving all political offices. 
* GET `/api/v1/offices/<id>` Getting a political office for a specific id.

* POST `/api/v1/parties` Create a political party.
* GET `/api/v1/parties` Get all political parties.
* GET `/api/v1/parties/<id>` Get a specific political party.
* PATCH `/api/v1/parties/<id>/name` Edit a specific political party.
* DELETE `/api/v1/parties/<id>` Delete a particular party.

* POST `/api/v1/auth/signup` Creating account.
* POST `/api/v1/auth/login` Sign in.
* POST `/api/v1/office/<id>/register` ​ Register a user as a candidate running for a ​ political office​.
* GET `/api/v1/office/<id>/result` Fetch the result of specific office following a concluded election.
* POST `/api/v1/votes` Vote for a ​ candidate.
* POST `/api/v1/petitions` Create ​ petitions ​ challenging the outcome of a concluded election.

# Heroku & Swagger API Documentation

Access link :[Visit the link](https://agile-citadel-73624.herokuapp.com/). You can test the above API using this Heroku URL `https://agile-citadel-73624.herokuapp.com/` with the above mentioned end point.

# Github-page
GitHub page (gh-page) of this project accessed using this link [Politico](https://niyobobo.github.io/Politico/)  For data validation purpose make sure your provide a dummy information in field of `email and password` (when requested) to continue to be able to view other pages.
