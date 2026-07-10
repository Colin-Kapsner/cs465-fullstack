/* GET Homepage */
const travel = (req, res) => {
    res.render('travel', { title: "Travlr Getawats"});
};

module.exports = {
    travel
};