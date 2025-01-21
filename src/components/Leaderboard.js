import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import twemoji from 'twemoji';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('https://your-backend-api.com/leaderboard');
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
