const router = require('express').Router();
const { text } = require('express');
const callApi = require('../utils/openai');
//model
const Chat = require('../models/data');
router.post('/', async (req, res) => {
    console.log("req.body", req.body   )
    const { id, prompt } = req.body.newChat;
    console.log("prompt", prompt, id );

    let newChat= {};
    try {
        const response = await callApi({ prompt });
        if (!id || !prompt) {
            res.status(400).send("Bad Request");
        }
        newChat = new Chat({
           id: id,
           prompt: prompt,
           bot: response?.choices[0].message?.content,
        // bot: "Hello",
           upvotes: {count: 0, users: []}
       });
       await newChat.save();
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    res.status(200).send(newChat);

});


module.exports = router;
