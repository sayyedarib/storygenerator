const router = require('express').Router();
const Chat = require('../models/data');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        let data;

        // If id is "all," fetch data in descending order of upvotes count
        if (id === "all") {
            data = await Chat.find().sort({ 'upvotes.count': -1 });
        } else {
            data = await Chat.findOne({ id: id });
        }
        res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

module.exports = router;
