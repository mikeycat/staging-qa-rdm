# Authentication

User authentication within the app is handled by [Firebase](https://firebase.google.com/). Users are stored in the application's database under the [user model](./MODELS.md). Sessions are generated once a user is logged in. The mix of Firebase, user and session models are how this web application handles users.
