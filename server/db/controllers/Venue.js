// Requiring the models we need for our queries
const { Venue, Show, User } = require('../sequelize');
const { getRecordByName, getRecordByID } = require('./utils');

// Create venue
// should we include photos?
const createVenue = async (req, res) => {
    try {
        const { name, address, city, state, zip_code } = req.body;
        Venue.create({
            name,
            address,
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

// Get all venues
const getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.findAll()
        console.log("retrieved venues from db", venues);
        res.status(200).send(venues);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }
}

// Get shows at a given venue
const getVenueShows = async (req, res) => {
    try {
        const venue = await Venue.findOne({
            where: {
                name: req.params.venueName
            }
        })
        const venueShows = await Show.findAll({
            where: {
                id_venue: venue.id
            },
            include: [
                { model: User, as: 'bands', attributes: ['name'] }, 
            ],
        })
        console.log("got shows at this venue", venueShows);
        res.send(venueShows);
    }
    catch (err) {
        console.log("error getting shows from this venue", err);
        res.send(err);
    }
}

// Allow user to follow a venue
const addFanToVenue = async (req, res) => {
    const { fanName, venueName } = req.body;
    const venue = await getRecordByName('venue', venueName);
    const fan = await getRecordByName('fan', fanName);
    try {
        FanVenue.create({
            id_fan: fan.id,
            id_venue: venue.id
        })
    res.send(201);
    }
    catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
} 

// Get fans who follow a given venue
const getVenueFans = async (req, res) => {
    try {
        const { venueName } = req.params;
        const venue = await getRecordByName('venue', venueName);
        const sql = `SELECT * FROM users WHERE id IN (
                        SELECT id_fan FROM fans_venues WHERE id_venue = ?)`;
        const fans = await sequelize.query(sql, {
            replacements: [venue.id]
        })
        res.status(200).send(fans[0]);
    }
    catch (err) {
        console.log(err)
        res.send(400);
    }
}


// Update venue
const updateVenue = async (req, res) => {
    try {
        const update = await Venue.update(
            {
                name: req.params.name,
                address1: req.params.address1,
                city: req.params.city,
                state: req.params.state,
                zip_code: req.params.zip_code
            },
            { where: { name: req.params.name } }
        )
        console.log("updated venue");
        res.send(200);
    }
    catch {
        console.log("error updating venue in db", err);
        res.send(400);
    }
}

// Delete venue
const removeVenue = async (req, res) => {
    try {
        console.log(req);
        await Venue.destroy({
            where: {
                name: req.body.name
            }
        })

        console.log("deleted venue from db", req);
        res.sendStatus(200);
    }
    catch {
        console.log("error deleting venue from db");
        res.send(400);
    }
}

module.exports = {
    addFanToVenue,
    createVenue, 
    getAllVenues, 
    getVenueFans,
    getVenueShows,
    removeVenue
}
