// Express Route
const router = require("express").Router();
const Chat = require("../models/data");

router.post("/:id", async (req, res) => {
  console.log("upvoting");
  try {
    const { id } = req.params;
    const { user } = req.body;

    // Find the chat message by ID
    const chatMessage = await Chat.findOne({ id });

    if (!chatMessage) {
      return res.status(404).json({ error: "Chat message not found" });
    }
    const upvotedUsers = new Set(chatMessage.upvotes.users);

    if (upvotedUsers.has(user)) {
      chatMessage.upvotes.count--;
      upvotedUsers.delete(user);
    } else {
      chatMessage.upvotes.count++;
      upvotedUsers.add(user);
    }
    chatMessage.upvotes.users = Array.from(upvotedUsers);

    await chatMessage.save();

    res.json({ message: "Upvote updated successfully" });
  } catch (error) {
    console.error("Error updating upvote:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
