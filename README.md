# emoji-verse# Emoji Verse

**Emoji Verse** is a playful social platform where everything is represented using emojis. Users can create short posts using only emojis, enjoy creative emoji chains, and share their creations with the world. The project is designed to bring fun and creativity to social interactions, exclusively in emoji form.

---

## Features

- **Emoji-Only Posts**: Users can create and share posts using emojis only.
- **Trending Emoji Chains**: Highlight popular emoji sequences or creative posts.
- **Emoji Reactions**: React to posts using emojis.
- **Social Sharing**: Share emoji creations on external platforms like Twitter or Instagram.
- **Custom Emoji Combos**: Save and share personalized emoji chains.
- **Leaderboard**: Showcase the most creative or popular emoji posts.

---

## Tech Stack

### Frontend
- **Framework**: React Native (for mobile) / Next.js (for web)
- **Styling**: Tailwind CSS or Styled Components
- **Emoji Library**: Twemoji or Emojibase

### Backend
- **Server**: Node.js with Express
- **Database**: Firebase or MongoDB
- **Hosting**: Vercel or AWS

### APIs
- **Emoji Rendering**: Custom API for emoji packs
- **Social Sharing**: Integration with Twitter and Instagram APIs

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/uuuchit/emoji-verse.git
   ```
2. Navigate to the project directory:
   ```bash
   cd emoji-verse
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request on GitHub.

---

## Roadmap

- [ ] Emoji search and autocomplete for post creation
- [ ] Enhanced leaderboard with categories
- [ ] Support for custom emoji packs
- [ ] AI-based emoji suggestions for creative posts
- [ ] Mobile app release on iOS and Android

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or suggestions, feel free to reach out:
- **GitHub Issues**: [Issues Page](https://github.com/uuuchit/emoji-verse/issues)

Let’s make the world a more expressive place, one emoji at a time! 🌟

---

## Current Implementation Status

- **Emoji-Only Posts**: Implemented in `src/backend/routes/emojiPosts.js` and `src/components/EmojiPost.js`.
- **Trending Emoji Chains**: Implemented in `src/components/TrendingEmojiChains.js`.
- **Emoji Reactions**: Implemented in `src/backend/routes/emojiReactions.js` and `src/components/EmojiReactions.js`.
- **Social Sharing**: Implemented in `src/api/socialSharing.js` and `src/components/SocialSharing.js`.
- **Custom Emoji Combos**: Implemented in `src/components/CustomEmojiCombos.js`.
- **Leaderboard**: Implemented in `src/backend/routes/leaderboard.js` and `src/components/Leaderboard.js`.

---

## Roadmap Features Not Yet Implemented

- Emoji search and autocomplete for post creation
- Enhanced leaderboard with categories
- Support for custom emoji packs
- AI-based emoji suggestions for creative posts
- Mobile app release on iOS and Android
