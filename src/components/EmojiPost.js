import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import twemoji from 'twemoji';
import axios from 'axios';

const EmojiPost = () => {
  const [emojiText, setEmojiText] = useState('');
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handlePost = () => {
    if (emojiText.trim()) {
      setPosts([...posts, emojiText]);
      setEmojiText('');
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`/api/emojiPosts/search/${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching emojis:', error);
    }
  };

  const handleSuggest = async (text) => {
    try {
      const response = await axios.post('/api/emojiPosts/suggest', { text });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    }
  };

  const renderEmoji = (emoji) => {
    return (
      <Text
        dangerouslySetInnerHTML={{
          __html: twemoji.parse(emoji),
        }}
      />
    );
  };

  return (
    <View>
      <TextInput
        value={emojiText}
        onChangeText={(text) => {
          setEmojiText(text);
          handleSearch(text);
          handleSuggest(text);
        }}
        placeholder="Type your emoji post here..."
      />
      <Button title="Post" onPress={handlePost} />
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {renderEmoji(item)}
          </View>
        )}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {renderEmoji(item.emoji)}
          </View>
        )}
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {renderEmoji(item)}
          </View>
        )}
      />
    </View>
  );
};

export default EmojiPost;
