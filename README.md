## Installation

### Platform & tools

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.
* [Install node.js](http://nodejs.org/download/) (requires node.js version >= 0.8.4)
* Install Grunt-CLI and Karma as global npm modules:

    ```
    npm install -g grunt-cli karma
    ```

(Note that you may need to uninstall grunt 0.3 globally before installing grunt-cli)

### Get the Code

Either clone this repository or fork it on GitHub and clone your fork:

```
git clone git@github.com:vatrai/projecteev.git
cd projecteev
```

### App Server

Our backend application server is a NodeJS application that relies upon some 3rd Party npm packages.  You need to install these:

* Install local dependencies (from the project root folder):

    ```
    cd server
    npm install
    cd ..
    ```

  (This will install the dependencies declared in the server/package.json file)

### Client App

Our client application is a straight HTML/Javascript application but our development process uses a Node.js build tool
[Grunt.js](gruntjs.com). Grunt relies upon some 3rd party libraries that we need to install as local dependencies using npm.

* Install local dependencies (from the project root folder):

    ```
    cd client
    npm install
    cd ..
    ```

  (This will install the dependencies declared in the client/package.json file)

## Building

* Optionally change the name of admin user in `server/lib/initDB.js`.  The default is 'Admin' (admin@abc.com : changeme).

    ```
    var initDB = {
      adminUser: { email: 'admin@abc.com', password: 'changeme', admin: true, firstName: 'Admin', lastName: 'User' },
    });
    // Note the user information, including password, are stored as plain text in the MongoLab database.
    ```

* Run our initialization script to initialize the database with a first admin user (admin@abc.com : changeme).

    ```
    node server/initDB.js
    ```

### Build the client app
The app made up of a number of javascript, css and html files that need to be merged into a final distribution for running.  We use the Grunt build tool to do this.
* Build client application:

    ```
    cd client
    grunt build
    cd ..
    ```

*It is important to build again if you have changed the client configuration as above.*

## Running
### Start the Server
* Run the server

    ```
    cd server
    node server.js
    cd ..
    ```
* Browse to the application at [http://localhost:3000]
* Login with the admin user as defined in `server/lib/initDB.js`.
