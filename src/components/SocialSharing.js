import React from 'react';
import { View, Button, Share } from 'react-native';
import { TwitterShareButton, TwitterIcon, InstagramShareButton, InstagramIcon } from 'react-share';

const SocialSharing = ({ postContent }) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: postContent,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.error('Error sharing: ', error);
    }
  };

  return (
    <View>
      <Button title="Share" onPress={handleShare} />
      <TwitterShareButton url={postContent}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <InstagramShareButton url={postContent}>
        <InstagramIcon size={32} round />
      </InstagramShareButton>
    </View>
  );
};

export default SocialSharing;
