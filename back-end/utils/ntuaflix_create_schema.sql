CREATE DATABASE IF NOT EXISTS ntuaflix;

USE ntuaflix;

-- i want to create a table whth name users whith attributes for the moment first_name,last_name,birthdate,email,role,and an id
CREATE TABLE IF NOT EXISTS Users (
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    birthdate DATE,
    email VARCHAR(255),
    role ENUM('simple_user', 'admin') DEFAULT 'simple_user',
    favorite_genre VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (user_id)
);

-- create a table Authentication whith attributes auth_id(primary key),password,username and add to the User table a foreign key auth_id to Authentication
CREATE TABLE IF NOT EXISTS Authentication (
    user_id INT NOT NULL,
    password VARCHAR(255) NOT NULL ,
    username VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (user_id),
    CONSTRAINT fk_user_id_auth_id
        FOREIGN KEY (user_id) 
        REFERENCES Users(user_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TokenBlacklist (
    token VARCHAR(255) NOT NULL,
    expiration_date DATETIME NOT NULL,
    PRIMARY KEY (token)
);


-- Insert Admin
INSERT INTO Users (first_name, last_name, birthdate, email, role) VALUES ('adminFN', 'adminLN', '1990-01-01', 'admin@example.com', 'admin');
INSERT INTO Authentication (user_id, password, username) VALUES (1, '$2a$08$NRJ0rUt2NnGosoWtgu3vyuSZQDZhRcGNBOmhuBpthqLsb8efR2rjS', 'admin');
-- passw = 1234

-- Insert Simple User
INSERT INTO Users (first_name, last_name, birthdate, email, role) VALUES ('userFN', 'userLN', '1990-01-01', 'user@example.com', 'simple_user');
INSERT INTO Authentication (user_id, password, username) VALUES (2, '$2a$08$NRJ0rUt2NnGosoWtgu3vyuSZQDZhRcGNBOmhuBpthqLsb8efR2rjS', 'user');
-- passw = 1234

-- Insert Simple User without profile
INSERT INTO Users (first_name, last_name, birthdate, email, role) VALUES (NULL, NULL, NULL, NULL, 'simple_user');
INSERT INTO Authentication (user_id, password, username) VALUES (3, '$2a$08$NRJ0rUt2NnGosoWtgu3vyuSZQDZhRcGNBOmhuBpthqLsb8efR2rjS', 'user2');
-- passw = 1234


-- create table TitleObject whit attributes movie_id,original_title,primary_title,start_year,end_year,is_adult,runtime_min,image_url,type
CREATE TABLE IF NOT EXISTS TitleObject (
    movie_id VARCHAR(20) NOT NULL ,
    original_title VARCHAR(255) ,
    primary_title VARCHAR(255) ,
    start_year INT,
    end_year INT,
    is_adult BOOLEAN ,
    runtime_min INT ,
    image_url VARCHAR(255) ,
    type VARCHAR(255) NOT NULL,
    PRIMARY KEY (movie_id)
);

-- create table Akas_info with attributes akas_id (primary key) , akas_title,region , language , is_original_title , movie_id (foreign key)
CREATE TABLE IF NOT EXISTS Akas_info (
    akas_id INT NOT NULL AUTO_INCREMENT,
    akas_title VARCHAR(255) ,
    region VARCHAR(255) ,
    language VARCHAR(255) ,
    is_original_title BOOLEAN ,
    movie_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (akas_id),
    CONSTRAINT fk_movie_id_akas_id
        FOREIGN KEY (movie_id) 
        REFERENCES TitleObject(movie_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

-- create table Genres whith movie_id (primary key and foreign key to TitleObject(movie_id)) and genre
CREATE TABLE IF NOT EXISTS Genres (
    genre_id INT NOT NULL AUTO_INCREMENT,
    movie_id VARCHAR(20) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    PRIMARY KEY (genre_id),
    CONSTRAINT fk_movie_id_genre
        FOREIGN KEY (movie_id) 
        REFERENCES TitleObject(movie_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

-- create table Episode_info whith movie_id(primary key and foreign key to TitleObject(movie_id)), season_num,episode_num,parent_id
CREATE TABLE IF NOT EXISTS Episode_info (
    movie_id VARCHAR(20) NOT NULL,
    season_num INT,
    episode_num INT,
    parent_id VARCHAR(20),
    PRIMARY KEY (movie_id),
    CONSTRAINT fk_movie_id_episode_info
        FOREIGN KEY (movie_id) 
        REFERENCES TitleObject(movie_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

-- create table Ratings whith movie_id(primary key and foreign key to TitleObject(movie_id)), average_rating,num_votes
CREATE TABLE IF NOT EXISTS Ratings (
    movie_id VARCHAR(20) NOT NULL,
    average_rating FLOAT,
    num_votes INT,
    PRIMARY KEY (movie_id),
    CONSTRAINT fk_movie_id_ratings
        FOREIGN KEY (movie_id) 
        REFERENCES TitleObject(movie_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

-- create table Types whith akas_id(primary key and foreign key to Akas_info(akas_id)), 

CREATE TABLE IF NOT EXISTS Types (
    type_id INT NOT NULL AUTO_INCREMENT,
    akas_id INT NOT NULL,
    type VARCHAR(255),
    PRIMARY KEY (type_id),
    CONSTRAINT fk_akas_id_types
        FOREIGN KEY (akas_id) 
        REFERENCES Akas_info(akas_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

-- create table Attributes whith akas_id(primary key and foreign key to Akas_info(akas_id)) and attribute
CREATE TABLE IF NOT EXISTS Attributes (
    attribute_id INT NOT NULL AUTO_INCREMENT,
    akas_id INT NOT NULL,
    attribute VARCHAR(255),
    PRIMARY KEY (attribute_id),
    CONSTRAINT fk_akas_id_attributes
        FOREIGN KEY (akas_id) 
        REFERENCES Akas_info(akas_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

-- create table Contributors whith attributes contributor_id(primary key),primary_name,birth_year,death_year, image_url
CREATE TABLE IF NOT EXISTS Contributors (
    contributor_id VARCHAR(20) NOT NULL,
    primary_name VARCHAR(255),
    birth_year INT,
    death_year INT,
    image_url VARCHAR(255),
    PRIMARY KEY (contributor_id)
);

-- create table Primary_profession whith attributes contributor_id(primary key and foreign key to Contributors(contributor_id)) and profession
CREATE TABLE IF NOT EXISTS Primary_profession (
    profession_id INT NOT NULL AUTO_INCREMENT,
    contributor_id VARCHAR(20) NOT NULL,
    profession VARCHAR(255),
    PRIMARY KEY (profession_id),
    CONSTRAINT fk_contributor_id_primary_profession
        FOREIGN KEY (contributor_id) 
        REFERENCES Contributors(contributor_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

-- create table Works whith attributes contributor_id(primary key and foreign key to Contributors(contributor_id)) and movie_id(foreign key to TitleObject(movie_id)) and attributes category,job,characters,image_url
CREATE TABLE IF NOT EXISTS Works (
    contributor_id VARCHAR(20) NOT NULL,
    movie_id VARCHAR(20) NOT NULL,
    category VARCHAR(255),
    job VARCHAR(255),
    characters VARCHAR(255),
    image_url VARCHAR(255),
    PRIMARY KEY (contributor_id,movie_id),
    CONSTRAINT fk_contributor_id_works
        FOREIGN KEY (contributor_id) 
        REFERENCES Contributors(contributor_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE,
    CONSTRAINT fk_movie_id_works
        FOREIGN KEY (movie_id) 
        REFERENCES TitleObject(movie_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

-- create table Known_for whith attributes contributor_id(primary key and foreign key to Contributors(contributor_id)) and movie_id(foreign key to TitleObject(movie_id))

CREATE TABLE IF NOT EXISTS Known_for (
    contributor_id VARCHAR(20) NOT NULL,
    movie_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (contributor_id,movie_id),
    CONSTRAINT fk_contributor_id_known_for
        FOREIGN KEY (contributor_id) 
        REFERENCES Contributors(contributor_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
    /* CONSTRAINT fk_movie_id_known_for
        FOREIGN KEY (movie_id) 
        REFERENCES TitleObject(movie_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE */ 
);

-- create table Watchlist whith attributes user_id(primary key and foreign key to Users(user_id)) and movie_id(foreign key to TitleObject(movie_id))
CREATE TABLE IF NOT EXISTS Watchlist (
    user_id INT NOT NULL,
    movie_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id,movie_id),
    CONSTRAINT fk_user_id_watchlist
        FOREIGN KEY (user_id) 
        REFERENCES Users(user_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE,
    CONSTRAINT fk_movie_id_watchlist
        FOREIGN KEY (movie_id) 
        REFERENCES TitleObject(movie_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

-- create table Favorites_list whith attributes user_id(primary key and foreign key to Users(user_id)) and movie_id(foreign key to TitleObject(movie_id))
CREATE TABLE IF NOT EXISTS Favorites_list (
    user_id INT NOT NULL,
    movie_id VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id,movie_id),
    CONSTRAINT fk_user_id_favorites_list
        FOREIGN KEY (user_id) 
        REFERENCES Users(user_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE,
    CONSTRAINT fk_movie_id_favorites_list
        FOREIGN KEY (movie_id) 
        REFERENCES TitleObject(movie_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);


-- When expiration time passes the token is deleted from the table
DELIMITER $$
CREATE EVENT IF NOT EXISTS deleteExpiredTokens
ON SCHEDULE EVERY 1 DAY
DO
    DELETE FROM TokenBlacklist WHERE expiration_date < NOW();
$$
DELIMITER ;