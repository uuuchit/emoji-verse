import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import twemoji from 'twemoji';

const TrendingEmojiChains = () => {
  const [trendingChains, setTrendingChains] = useState([]);

  useEffect(() => {
    fetchTrendingChains();
  }, []);

  const fetchTrendingChains = async () => {
    try {
      const response = await fetch('https://your-backend-api.com/trending-chains');
      const data = await response.json();
      setTrendingChains(data);
    } catch (error) {
      console.error('Error fetching trending emoji chains:', error);
    }
  };

  const renderEmojiChain = (chain) => {
    return (
      <Text
        dangerouslySetInnerHTML={{
          __html: twemoji.parse(chain),
        }}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={trendingChains}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {renderEmojiChain(item)}
          </View>
        )}
      />
    </View>
  );
};

export default TrendingEmojiChains;
