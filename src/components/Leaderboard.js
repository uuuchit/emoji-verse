import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Picker } from 'react-native';
import twemoji from 'twemoji';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchLeaderboardData();
  }, [selectedCategory]);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(`https://your-backend-api.com/leaderboard/category/${selectedCategory}`);
      const data = await response.json();
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  const renderEmojiPost = (post) => {
    return (
      <Text
        dangerouslySetInnerHTML={{
          __html: twemoji.parse(post),
        }}
      />
    );
  };

  return (
    <View>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Most Creative" value="most-creative" />
        <Picker.Item label="Most Popular" value="most-popular" />
      </Picker>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {renderEmojiPost(item)}
          </View>
        )}
      />
    </View>
  );
};

export default Leaderboard;
