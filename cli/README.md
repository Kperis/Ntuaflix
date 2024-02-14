# CLI client

## About

### Usecases
1. Login - Logout
2. Admin 
    - Add user
    - Search for user
    - Add newtitles file
    - Add newakas file
    - Add newnames file
    - Add newcrew file
    - Add newepisode file
    - Add newprincipals file
    - Add newratings file
    - Reset database
    - Check if database is healthy
3. Usecase 1: Movies - Series - Actors - Contributors
    - Search for Titles
    - Search for Contributors
    - Get info for a Title
    - Get info for a Contributor
    - Search movies by genre
4. Usecase 2: User Profile
    - Create Profile
    - Add movies to your "Favorites" list
    - Add movied to your "Watchlater" list
    - Edit these lists

_The above use cases are properly explained in the ntuaflix documentation [VPP-FILE]_
[VPP-FILE]: https://github.com/ntua/softeng23-33/tree/main/documentation

### NodeJS Packages:
```json
  "dependencies": {
    "axios": "^1.6.6",
    "chalk": "^2.4.2",
    "commander": "^11.1.0",
    "inquirer": "^9.2.12",
    "json-2-csv": "^5.0.1",
    "json2csv": "^6.0.0-alpha.2",
    "qs": "^6.11.2",
    "yargs-parser": "^21.1.1"
  },
  "devDependencies": {
    "chai": "^4.3.4",
    "mocha": "^10.2.0",
    "nodemon": "^3.0.3"
  }
```

## Getting Started

### Prerequisites
1. The database must have been initialized. [Inizitializing_Database]
<!--add a link to the readme of back-end in the "Initializing Database" sector-->
[Inizitializing_Database]: ../back-end/README.md#getting-started
2. The server must be running.

3. The client must have the following packages installed:
```bash
npm install
```
```bash
npm install -g
```

### Usage
First type the following command to see the available commands:
```bash
se2333 help
```

### Commands
(Maybe)