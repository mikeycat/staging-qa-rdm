# Future Progression for Test Automation Framework

## UI / UX

The user interface / user experience improvements would be the place to start if you are trying to learn and understand the application. Before starting here make sure you have an understanding of the Angular framework.

### Error Handling

This application is currently build on around no errors happening. However, with working with three seperate APIs (Firebase, Endtest, and it's own) many errors are prone to happen. I would start with forcing errors and trying to break the application. Once it does break or doesn't function the way it is supposed to look into the console log. It is very likely it is just printed out there. Find the error in the code. Then decided what to do. In many cases a simple ["toast"](https://material.angular.io/components/snack-bar/overview) is good enough.

### Input Validation

This is a little more advanced than the previous improvement. But like I said previously this application is built around no errors happening. A lot of errors happen when prompting users to input data. More validation in forms with the "toasts" from above would suffice. An understanding of [Angular Form Validation](https://angular.io/guide/form-validation) will help here.

### Angular URL Persistance

A bug that is bothering me the most is the fact that the path gaurds send users to dashboard no matter what. If a user is logged in they should be able to go straight to Admin Dashboard. I believe this is caused by user authentication taking longer than angular is willing to wait to display a page. An undertanding of [Angular Path Gaurds](https://angular.io/guide/router) would help here.

## Server Infrastructure

Here is where things are going to start to get more complicated. An understanding of Node.js and typescript is needed to work on the server infrastructure.

### User Session

Since user authentication is handled by Google Firebase, so an understanding of it is needed here. My current system of user session is far from perfect. It is also causing a large amount of extra database rows. I would probably scrap everything with users and sessions and start again. The application needs some form of a way to get a users email from Firebase at any moment. The application also needs a way to disable and assign roles to users. Firebase may have a way to handle all of those requirements. However, I only had half a day to work on user sessions.

### API

I have not created a standard for the API. I think a standard to the naming of routes would be a great improvement here. Also to make the API private would be a great security improvement. This can be done by user sessions. Essentially force a user to be logged in to do a POST request to the server. The validation would be done on the server side. Check the cookies from the request to see if it has a valid session cookie. This API has no use in the future to be a public API so just completly secure it.

### Error Handling

Again error handling needs improvement here. Most of the error handling here can be improved by better validation in typeorm for the database. Then figuring out a way to send that back to the user session. I would send it back with a different responce code. An understanding of http and https would help here.

## Endtest

This is a very futristic goal. However, I believe it can be done. I have mapped Endtests websites functionality and I strongly believe that it is possible to just use their backend but create a brand new front end.

After using Endtest for two months I realised it isn't the most responsive. Many days were spent staring at the loading spinner. This is a complete waiste of time and caused me to completly map their backend calls. This is done by using the network tab in any browsers developer tools and interacting with the website.

Endtest works by using Ajax and php scripts. This is an older style of web applications that can be easily mapped. This also means everything that can be done on the web application can be re-written by us. A major waiste of time when it comes to Endtest is how they render pages. Nearly everything on the web page is render by using vanilla js, instead of html pages.

Where you take this is up to you.