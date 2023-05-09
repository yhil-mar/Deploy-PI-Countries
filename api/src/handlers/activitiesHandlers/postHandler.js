const postActivity = require('../../controllers/postActivity');

module.exports = async (req, res) => {

    const { name, difficult, duration, season, countries } = req.body;

    try {

        const result = await postActivity(name, difficult, duration, season, countries);

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({ error: error.message });
    };

};