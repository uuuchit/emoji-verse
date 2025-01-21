import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';

const CustomEmojiPacks = () => {
  const [emojiPackName, setEmojiPackName] = useState('');
  const [emojiPackContent, setEmojiPackContent] = useState('');
  const [emojiPacks, setEmojiPacks] = useState([]);

  useEffect(() => {
    fetchEmojiPacks();
  }, []);

  const fetchEmojiPacks = async () => {
    try {
      const response = await axios.get('/api/customEmojiPacks');
      setEmojiPacks(response.data);
    } catch (error) {
      console.error('Error fetching emoji packs:', error);
    }
  };

  const handleSavePack = async () => {
    if (emojiPackName.trim() && emojiPackContent.trim()) {
      try {
        const response = await axios.post('/api/customEmojiPacks', {
          name: emojiPackName,
          content: emojiPackContent,
        });
        setEmojiPacks([...emojiPacks, response.data]);
        setEmojiPackName('');
        setEmojiPackContent('');
      } catch (error) {
        console.error('Error saving emoji pack:', error);
      }
    }
  };

  const handleDeletePack = async (id) => {
    try {
      await axios.delete(`/api/customEmojiPacks/${id}`);
      setEmojiPacks(emojiPacks.filter(pack => pack._id !== id));
    } catch (error) {
      console.error('Error deleting emoji pack:', error);
    }
  };

  const renderEmojiPack = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.content}</Text>
      <Button title="Delete" onPress={() => handleDeletePack(item._id)} />
    </View>
  );

  return (
    <View>
      <TextInput
        value={emojiPackName}
        onChangeText={setEmojiPackName}
        placeholder="Emoji Pack Name"
      />
      <TextInput
        value={emojiPackContent}
        onChangeText={setEmojiPackContent}
        placeholder="Emoji Pack Content"
      />
      <Button title="Save Pack" onPress={handleSavePack} />
      <FlatList
        data={emojiPacks}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderEmojiPack}
      />
    </View>
  );
};

export default CustomEmojiPacks;
