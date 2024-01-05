-- Create the database
CREATE DATABASE IF NOT EXISTS softeng33;
USE softeng33;

-- Create the Person table
CREATE TABLE Person (
    nconst VARCHAR(255) PRIMARY KEY,
    primaryName VARCHAR(255),
    birthYear INT,
    deathYear INT,
    primaryProfession VARCHAR(255),
    knownForTitles VARCHAR(255),
    img_url_asset VARCHAR(255)
);

-- Create the TitleBasics table
CREATE TABLE TitleBasics (
    tconst VARCHAR(255) PRIMARY KEY,
    titleType VARCHAR(255),
    primaryTitle VARCHAR(255),
    originalTitle VARCHAR(255),
    isAdult BOOLEAN,
    startYear INT,
    endYear INT,
    runtimeMinutes INT,
    genres VARCHAR(255),
    img_url_asset VARCHAR(255)
);

-- Create the TitleAkas table
CREATE TABLE TitleAkas (
    titleId VARCHAR(255),
    ordering INT,
    title VARCHAR(255),
    region VARCHAR(255),
    language VARCHAR(255),
    types VARCHAR(255),
    attributes VARCHAR(255),
    isOriginalTitle BOOLEAN,
    PRIMARY KEY (titleId, ordering),
    FOREIGN KEY (titleId) REFERENCES TitleBasics(tconst)
);

-- Create the TitleCrew table
CREATE TABLE TitleCrew (
    tconst VARCHAR(255) PRIMARY KEY,
    directors VARCHAR(255),
    writers VARCHAR(255),
    FOREIGN KEY (tconst) REFERENCES TitleBasics(tconst)
);

-- Create the TitleEpisode table
CREATE TABLE TitleEpisode (
    tconst VARCHAR(255) PRIMARY KEY,
    parentTconst VARCHAR(255),
    seasonNumber INT,
    episodeNumber INT,
    FOREIGN KEY (parentTconst) REFERENCES TitleBasics(tconst)
);

-- Create the TitlePrincipals table
CREATE TABLE TitlePrincipals (
    tconst VARCHAR(255),
    ordering INT,
    nconst VARCHAR(255),
    category VARCHAR(255),
    job VARCHAR(255),
    characters VARCHAR(255),
    img_url_asset VARCHAR(255),
    PRIMARY KEY (tconst, ordering),
    FOREIGN KEY (tconst) REFERENCES TitleBasics(tconst),
    FOREIGN KEY (nconst) REFERENCES Person(nconst)
);

-- Create the TitleRatings table
CREATE TABLE TitleRatings (
    tconst VARCHAR(255) PRIMARY KEY,
    averageRating DECIMAL(3, 2),
    numVotes INT,
    FOREIGN KEY (tconst) REFERENCES TitleBasics(tconst)
);


