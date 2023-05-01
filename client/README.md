#### Getting Started
* Make sure you have [Node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed
* Clone this repo to your local machine.
* `npm install` from the root folder, to get the dependencies for the server.
* `npm install` from the `./client` folder, to get the dependencies for the client.
* Spawn a local node server with `npm run server` and a client with `npm run client`

#### Setting up MySQL DB
* Create `.env` file in your ./server folder
* Set the following variables with your Postgres setting. The following value is an example.
  - DB_HOST='localhost'
  - DB_USER='root'
  - DB_PASSWORD='password'
  - DB_NAME='CourseScoresDB'
  - SERVER_PORT=4000

#### Setting up React App
* Create a `.env` file in your ./client directory.
* Set the following variables with your server settings. The following values is an example.
  - REACT_APP_HOST=localhost
  - REACT_APP_PORT=4000