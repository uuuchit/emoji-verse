require('dotenv').config();

const mongoose = require('mongoose');
const firebase = require('firebase');

// MongoDB connection
const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/emojiVerse';
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};
firebase.initializeApp(firebaseConfig);

// Schemas
const emojiPostSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const emojiReactionSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,
  emoji: String,
  createdAt: { type: Date, default: Date.now }
});

const leaderboardSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

// Models
const EmojiPost = mongoose.model('EmojiPost', emojiPostSchema);
const EmojiReaction = mongoose.model('EmojiReaction', emojiReactionSchema);
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = {
  EmojiPost,
  EmojiReaction,
  Leaderboard
};
