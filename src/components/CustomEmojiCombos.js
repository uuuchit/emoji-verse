import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import twemoji from 'twemoji';

const CustomEmojiCombos = () => {
  const [emojiCombo, setEmojiCombo] = useState('');
  const [customCombos, setCustomCombos] = useState([]);

  const handleSaveCombo = () => {
    if (emojiCombo.trim()) {
      setCustomCombos([...customCombos, emojiCombo]);
      setEmojiCombo('');
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
        value={emojiCombo}
        onChangeText={setEmojiCombo}
        placeholder="Type your custom emoji combo here..."
      />
      <Button title="Save Combo" onPress={handleSaveCombo} />
      <FlatList
        data={customCombos}
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

export default CustomEmojiCombos;
