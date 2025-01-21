require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const firebase = require('firebase');
const path = require('path');
const emojiPostsRoutes = require('./routes/emojiPosts');
const emojiReactionsRoutes = require('./routes/emojiReactions');
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
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

// Routes
app.use('/api/emojiPosts', emojiPostsRoutes);
app.use('/api/emojiReactions', emojiReactionsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../../out')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../out/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
