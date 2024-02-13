# CLI client

## About

### Contents:

What the folder contains:


### Usecases
1. Login - Logout
2. Admin 
    - Add Movie
    - Remove Movie
    - Update Movie
    - Add User
    - Remove User
    - Update User
    - Add Actor
    - Remove Actor
    - Update Actor
    - Add Director
    - Remove Director
    - Update Director
    - Add Genre
    - Remove Genre
    - Update Genre
3. Usecase 1: Movies - Series - Actors - Contributors
    - search for specific title
    - Search
    - Filter
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
    "axios": "^0.24.0",
    "chalk": "^4.1.2",
    "commander": "^8.3.0",
    "inquirer": "^8.1.2",
    "ora": "^5.5.0"
  }
```

## Getting Started

### Prerequisites
1. The database must have been initialized. [Inizitializing_Database]
<!--add a link to the readme of back-end in the "Initializing Database" sector-->
[Inizitializing_Database]: ../back-end/README.md#Initializing-database
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