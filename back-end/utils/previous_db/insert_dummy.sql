-- Insert data into Person table
INSERT INTO Person (nconst, primaryName, birthYear, deathYear, primaryProfession, knownForTitles, img_url_asset)
VALUES ('N1', 'John Doe', 1980, NULL, 'Actor', 'tt1234567,tt2345678', 'john_doe.jpg');

-- Insert data into TitleBasics table
INSERT INTO TitleBasics (tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear, runtimeMinutes, genres, img_url_asset)
VALUES ('tt1234567', 'movie', 'Awesome Movie', 'Awesome Movie', 0, 2020, NULL, 120, 'Action, Drama', 'awesome_movie.jpg');

-- Insert data into TitleAkas table
INSERT INTO TitleAkas (titleId, ordering, title, region, language, types, attributes, isOriginalTitle)
VALUES ('tt1234567', 1, 'Alternate Title', 'US', 'English', 'primary', 'short title', 0);

-- Insert data into TitleCrew table
INSERT INTO TitleCrew (tconst, directors, writers)
VALUES ('tt1234567', 'N1,N2', 'N3,N4');

-- Insert data into TitleEpisode table
INSERT INTO TitleEpisode (tconst, parentTconst, seasonNumber, episodeNumber)
VALUES ('tt1234567', NULL, 1, 1);

-- Insert data into TitlePrincipals table
INSERT INTO TitlePrincipals (tconst, ordering, nconst, category, job, characters, img_url_asset)
VALUES ('tt1234567', 1, 'N1', 'actor', 'lead', 'Character A', 'character_a.jpg');

-- Insert data into TitleRatings table
INSERT INTO TitleRatings (tconst, averageRating, numVotes)
VALUES ('tt1234567', 8.5, 1000);