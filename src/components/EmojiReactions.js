import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import twemoji from 'twemoji';

const EmojiReactions = ({ postId }) => {
  const [reactions, setReactions] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleReaction = () => {
    if (selectedEmoji.trim()) {
      setReactions([...reactions, selectedEmoji]);
      setSelectedEmoji('');
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
      <Text>Select an emoji to react:</Text>
      <TextInput
        value={selectedEmoji}
        onChangeText={setSelectedEmoji}
        placeholder="Type your emoji reaction here..."
      />
      <Button title="React" onPress={handleReaction} />
      <FlatList
        data={reactions}
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

export default EmojiReactions;
