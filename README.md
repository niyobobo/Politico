# Politico -  Andela Developer Challenge

[![Build Status](https://travis-ci.org/niyobobo/Politico.svg?branch=)](https://travis-ci.org/niyobobo/Politico) [![Coverage Status](https://coveralls.io/repos/github/niyobobo/Politico/badge.svg?branch=ft-api)](https://coveralls.io/github/niyobobo/Politico?branch=ft-api) [![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/niyobobo/Politico)

# Github-page
GitHub page (gh-page) of this project accessed using this link [Politico](https://niyobobo.github.io/Politico/)  For data validation purpose make sure your provide a dummy information in field of `email and password` (when requested) to continue to be able to view other pages.

# Technology
* `NodeJs` Runtime environment that helps to run JavaScript not only in the browser even on the server.
* `Express` NodeJS framework used for making the back-end.
* `Git` For code versioning.
* `Joi` and `Morgan` API request body error validation and HTTP Request logger respectively.

# Application
For running and testing application. You run the following npm scripts
* `npm start` for starting the server.
* `npm test` for running the tests.

# API

* POST `/api/v1/offices` Creating a political office.
* GET `/api/v1/offices` Retreiving all political offices. 
* GET `/api/v1/offices/<id>` Getting a political office for a specific id.

* POST `/api/v1/parties` Create a political party.
* GET `/api/v1/parties` Get all political parties.
* GET `/api/v1/parties/<id>` Get a specific political party.
* PATCH `/api/v1/parties/<id>/name` Edit a specific political party.
* DELETE `/api/v1/parties/<id>` Delete a particular party.

# Heroku

Access link : [HerokuServer](https://agile-citadel-73624.herokuapp.com/). You can even test the above API using this roo URL concatenated with the above mentioned end point.
