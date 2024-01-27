
const { getTitleObject } = require('../middlewares/getTitleObject');
const { pool } = require('../utils/database');

// Possible Status Codes:
// 200 OK - OK
// 400 Bad Request - OK
// 404 Not Found - OK
// 500 Internal Server Error - OK


exports.getTitle = (req, res, next) => {
    // Check for Bad Request -> 400 status code
    if (Object.keys(req.params).length > 1) {
        return res.status(400).send('Bad Request');
    }
    
    let titleID = req.params.titleID;

    if (titleID.startsWith(':')) {
        titleID = titleID.substring(1);
    }

    getTitleObject(titleID)
    .then((titleObject) => {
        console.log(titleObject);
        res.status(200).json(titleObject);
    })
    .catch((error) => {
        console.error(error);
        res.status(error.status).json({ message: error.message });
    });
    console.log(titleID);
};



//////////////////////////
// Example of a josn titleObject
// {
//     "titleID": "tt123456",
//     "type": "movie",
//     "originalTitle": "The Original Title",
//     "titlePoster": "https://example.com/poster.jpg",
//     "startYear": "2022",
//     "endYear": "2024",
//     "genres": [
//       {
//         "genreTitle": "Drama"
//       },
//       {
//         "genreTitle": "Action"
//       }
//     ],
//     "titleAkas": [
//       {
//         "akaTitle": "Alternate Title 1",
//         "regionAbbrev": "US"
//       },
//       {
//         "akaTitle": "Alternate Title 2",
//         "regionAbbrev": "UK"
//       }
//     ],
//     "principals": [
//       {
//         "nameID": "nm789012",
//         "name": "John Doe",
//         "category": "actor"
//       },
//       {
//         "nameID": "nm345678",
//         "name": "Jane Smith",
//         "category": "director"
//       }
//     ],
//     "rating": {
//       "avRating": "8.5",
//       "nVotes": "1000"
//     }
//   }