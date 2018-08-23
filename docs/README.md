# RDM Automation Framework

Rogers Digital Media Automation Framework is a web application designed to make test automation easier. This is achieved by a nightly scheduler, dashboard, and other features.

## Documentation

- [Authentication](./AUTH.md)
- [Database](./DATABASE.md)
- [Data Models](./MODELS.md)
- [API](./API.md)
- [Future Progression](./IDEAS.md)

## Getting Started

#### Git

The version control system is [Git](https://git-scm.com/). Which will need to be installed to get the source code of the project. Following this [link](https://git-scm.com/downloads) to git download page you can download and install git.

#### Heroku

This project is hosted on [Heroku](https://www.heroku.com/). This project also uses Heroku Git for deployment of the application. You will need to install Heroku Cli, following this [link](https://devcenter.heroku.com/articles/heroku-cli).

#### Package Manager / Server

You will need [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) to run this project locally. These both are installed with npm. Following this [link](https://www.npmjs.com/get-npm) will bring you to the npm download page. Download and install npm. Once completed you can run `npm -f i` in the root directory of the project to download all application dependecies.

#### Database

The database management system used in this project is [PostgreSQL](https://www.postgresql.org/). For this project to work locally you will need to have a working and running version of PostgreSQL. This can be accomplished by downloading and installing PostgreSQL. Following this [link](https://www.postgresql.org/download/) will bring you to the download page.

## Deployment

#### Local

To deploy to a local instance, ideal for testing and development, you will need Node.js, npm, and PostgreSQL. To verify all of these you can run the following commands: `npm -v`, `node  -v`

```bash
$ npm -v
6.1.0
$ node -v
v8.11.3
```

Once npm and Node.js are installed you will need to configure the database. Reference [DATABASE.md](./DATABASE.md). Now you will need to install all npm dependencies with `npm i -f`. When this completes you are able to run the server for this application by running `npm run server`.

#### Heroku

To deploy to the Heroku instance follow this [documentation](https://devcenter.heroku.com/articles/heroku-cli) provided by Heroku.


## Authors

* **Austin Kirby** - *Initial work* - [kirby.is.austin9@gmail.com](mailto:kirby.is.austin9@gmail.com)
