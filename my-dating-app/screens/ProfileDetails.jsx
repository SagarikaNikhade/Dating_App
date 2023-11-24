import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileDetails = ({ route }) => {
  const { profileId } = route.params;
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`https://expensive-tan-dolphin.cyclic.app/profile/${profileId}`);
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [profileId]);

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileData.image }} style={styles.profileImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{profileData.name}</Text>
        <Text>{profileData.age} years old</Text>
        <Text>{profileData.gender}</Text>
        <Text>{profileData.location}</Text>
        <Text style={styles.bio}>{profileData.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ProfileDetails;
