const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users'); // Import User model

// Helper function to get authenticated user
const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User.findOne({ email: req.payload.email }).exec((err, user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            } else if (err) {
                return res.status(500).json(err);
            }
            callback(req, res, user);
        });
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

// GET all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single trip by `tripCode`
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Trip.findOne({ code: req.params.tripCode });
        if (trip) {
            res.status(200).json(trip);
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST: Add a new trip
const tripsAddTrip = async (req, res) => {
    //getUser(req, res, (req, res, user) => {
    const newTrip = new Trip(req.body);
    try {
        const trip = await newTrip.save();
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
    //});
};

// PUT: Update an existing trip
// Regardless of outcome, response must include HTML status
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
    const q = await Trip
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();
    if (!q) { // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }
    // Uncomment the following line to show results of
    operation
    // on the console
    // console.log(q);
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
};