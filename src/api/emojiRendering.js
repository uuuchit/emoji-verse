const express = require('express');
const router = express.Router();
const twemoji = require('twemoji');
const emojibase = require('emojibase');

// Endpoint to render emojis using Twemoji
router.get('/twemoji/:emoji', (req, res) => {
  const emoji = req.params.emoji;
  const renderedEmoji = twemoji.parse(emoji);
  res.send(renderedEmoji);
});

// Endpoint to render emojis using Emojibase
router.get('/emojibase/:emoji', (req, res) => {
  const emoji = req.params.emoji;
  const renderedEmoji = emojibase.shortcodesToUnicode(emoji);
  res.send(renderedEmoji);
});

module.exports = router;
