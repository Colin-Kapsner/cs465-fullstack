/* GET Homepage */
const index = (req, res) => {
    res.render('index', { title: "Travlr Getawats"});
};

module.exports = {
    index
};