import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import twemoji from 'twemoji';

const EmojiPost = () => {
  const [emojiText, setEmojiText] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePost = () => {
    if (emojiText.trim()) {
      setPosts([...posts, emojiText]);
      setEmojiText('');
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
        onChangeText={setEmojiText}
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
    </View>
  );
};

export default EmojiPost;
