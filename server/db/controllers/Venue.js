// Requiring the models we need for our queries.
const { Venue } = require('../sequelize');
const bodyParser = require('body-parser');

// Create venue
const createVenue = async (req, res) => {
    try {
        const { name, address1, address2, city, state, zip_code } = req.body;
        Venue.create({
            name,
            address1,
            address2,
            city,
            state,
            zip_code
        })
        res.send(201);
    }
    catch (err) {
        console.log(err);
        res.send(400);
    }
}
//raw mysql data format to enter data into db
//INSERT INTO `venues` (`name`, `address1`, `city`, `zip_code`, `createdAt`,`updatedAt`) VALUES ('Tipitinas', '501 Napolean Ave', 'New Orleans', 70115, '2020-01-01 10:10:10', '2020-01-01 10:10:10');

// Get all venues
const getAllVenues = () => {
    const venues = Venue.findAll()
    console.log("retrieved venues from db", venues);
    return venues;
}
// const getAllVenues = async (req, res) => {
//     try {
//         const { name, address1, address2, city, state, zip_code } = req.params;
//         const venues = await Venues.findOrCreate({
//             where: {
//                 name: name,
//                 address1: address1,
//                 address2: address2,
//                 city: city,
//                 zip_code: zip_code,
//             }
//         })
//         console.log("we're getting venues from db", venues);
//         res.status(200).send(venues);
//     }
//     catch (err) {
//         console.log("error getting venues from db", err);
//         res.send(err);
//     }
// }

// Get shows at a given venue

// Update venue

// Delete venue


module.exports = {
    createVenue, getAllVenues
}