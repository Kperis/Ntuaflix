# Back-end

## About

### We used:
![NodeJS](https://img.shields.io/badge/nodeJS-v26.6.1+-blue.svg)
![Express](https://img.shields.io/badge/express-v4.18.2+-red.svg)
![mysql](https://img.shields.io/badge/mysql-v2.18.1+-yellow.svg)\
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-v9.0.2+-green.svg)
![bcryptjs](https://img.shields.io/badge/bcryptjs-v2.4.3+-blue.svg)
![nodemon](https://img.shields.io/badge/nodemon-v3.0.3+-red.svg)

### Contents:

Server and REST-API:
  - App.js and Index.js: The main files to start the app and the server and connect to the database (Database must have been created first)
  - Routes: Based on the requests, the routes will call the controllers ( and if needed, the middlewares) 
  - Middlewares: 
    - Authentication
    - Authorization
    - Functions used by the controllers 
  - Controllers: Handle the requests and responses
  - Utils/Database Implementation
    - Database code (.sql)
      - The database contains the tables and the admin user
    - .js files to import data 

Non Functional Requirements:
  - Authorization: Every user is stored in the database with a role ("admin", "simple_user")
  - Authentication / JWEB Token: 
    - The user logs in and receives a WEB token
    - The token is used to authenticate the user in the requests
    - The middleware takes the token from the request header and checks if it is valid
  - Security : (DDOS Attacks (if implemented) )
  - Performance: The app is performant
  - Maintainability: The app is maintainable
  - Testability: The app is testable
  - Reliability: The app is reliable
  - Interoperability: The app is interoperable (Supports all OS and Browsers)

Testing:
  1. Test cases for the REST-API:
    - In the test folder, there are test cases for the REST-API
    - The tests are written in Mocha and Chai
          <p align="right"><a href="#testing">Check Testing</a></p>
  2. Postman Scripts
    - The postman scripts are in the postman folder
    - The scripts are used to test the REST-API



### Usecases
1. Admin Usecase:
    - Upload of tsv files with data.
    - Create new users.
    - Get info of users.
2. User Usecase 1:
    - Browse on titles by titlepart.
    - Browse on titles by genre.
    - Get info of a specific title.
    - Browse on contributor name by namepart.
    - Get info of a specific contributor.
3. User Usecase 2:
    - Create user profile.
    - Add movies to your "Favorites" list.
    - Add movied to your "Watchlater" list.
    - Edit these lists.
    - Update user profile info.
    - View the contents of your lists.

_The above use cases are properly explained in the ntuaflix documentation [VPP-FILE]_

<!--[VPP-FILE]: ../documentation/README.md
-->
[VPP-FILE]: https://github.com/ntua/softeng23-33/tree/main/documentation


### NodeJS Packages:
```json
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "csv-parser": "^3.0.0",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "fast-csv": "^5.0.0",
    "isarray": "^2.0.5",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "mysql": "^2.18.1",
    "mysql2": "^3.9.0",
    "promise": "^8.3.0"
  },
  "devDependencies": {
    "chai": "^4.3.4",
    "chai-http": "^4.4.0",
    "cross-env": "^7.0.3",
    "mocha": "^10.2.0",
    "nodemon": "^3.0.3",
    "supertest": "^6.3.4"
  }
```


## Getting Started

### Initializing database
1. Start a MySQL Server (We used XAMPP)
    - If you are using Linux and have LANMP installed, you can start the server with the following command
    ```sh
    ./run_lampp_linux.sh
    ```
2. Create the database using the ./utils/ntuaflix_create_schema.sql
    - a. In your DBMS use this file 
    - b. If you are using linux run the following command in the terminal
    ```sh
    ./create_schema_linux.sh
    ``` 
    - c. If you are using windows run the following command in the terminal
    ```sh
    ./create_schema_windows.sh
    ```
3. If you want to add the data from the tsv files to the database, you can use the following command
    ```sh
    npm run data
    ```

### Start the Server and the REST-API
Firstly the local web development toolkit (like XAMPP) must be running. 
1. Install all dependencies
   ```sh
   npm install 
   ```
2. Run the REST-API
   ```sh
   npm start 
   ```

*You can use these users :*
```json
  "user": { "username": "user","password": "1234"},
  "admin": { "username": "admin", "password": "1234"}
```


## Testing
Firstly the local web development toolkit (like XAMPP) must be running. 
1. Install all dependencies
   ```sh
   npm install 
   ```
2. Test the REST-API
   ```sh
   npm test 
   ```

## URLs
### Admin
   - Login <br/>
      ```json
      Type: POST,
      URl: http://localhost:9876.ntuaflix_api/auth/login,
      Body: {
         "username":"usernmae",
         "password":"passwrod"
         }

      Reply: {
         "token": "eyashjfyyhanmlasdf3l4na.fdashfh3mvcsaffhasdfhobnm234nfqew.vjkasdhfiuhqQQKjhochaws"
         }
      ```
  - Register <br/>
      ```json
      should i continue?
      ```
