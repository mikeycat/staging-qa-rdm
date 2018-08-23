# Database

This application uses PostgreSQL as the object-relational database management system. The interaction between the database and the server is handled through typeorm. typeorm offers an object-relational mapping framework designed to work with typescript.

The `ormconfig.json` file contains the values required to connect to the PostgreSQL database provided by Heroku. When running a local instance you will need to change this file to represent the login information for your local instance of PostgreSQL. Other than this change the application should work "straight out of the box".

Reference [Data Models](./MODELS.md) for more information pertaining to the Database.