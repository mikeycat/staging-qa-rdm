# API

The open api that serves data to the web application follows a simple pattern. Each database model is accessable through /api/[model name]s/. Through this url you can view all, view by an id, insert, update, or delete a particular data model instance. In my example I will use the data model browsers however, this should work for any model.

## View all

GET `/api/browsers/`

A get request to this url will return all browsers. This is often utilized when then is a drop down populated with browsers. This will also return all relational data. In this example it will also return operating systems that the browsers can be used on.

## View by ID

GET `/api/browsers/:id`

By replacing :id in the url with an id present in the database the return will be all data and relational data that belongs to that id.

## Insert

POST `/api/browsers/insert`

With a post request to this url that includes valid browser model, excluding the id, an entry will be made in the database with the included values. This will return the new data entries id.

## Update

POST `/api/browsers/update`

A post request to this url that includes a valid browser model, including the id, an entry will be updated in the database with the included values. This will return true or false representing the successful completion of the update.

## Delete

POST `/api/browsers/delete`

A post request to this url that includes a valid browser model, including the id, an entry will be deleted in the database with the included values. This will return true or false representing the successful completion of the delete.