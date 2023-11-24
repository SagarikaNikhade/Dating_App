import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';

const ProfileDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [profileData, setProfileData] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`https://expensive-tan-dolphin.cyclic.app/profile/${id}`);
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [id]);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleBookmarkPress = () => {
    toggleBookmark();

    // Show the modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    // Navigate to the "Bookmark" page after closing the modal
    navigation.navigate('Bookmark');
  };

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/premium-photo/composition-valentine-s-day-bouquet-red-roses-hearts-pink-background-copyspace_163828-1402.jpg',
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={{ uri: profileData.image }} style={styles.profileImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.details}>{profileData.age} years old | {profileData.gender}</Text>
          <Text style={styles.details}>{profileData.location}</Text>
          <Text style={styles.bio}>{profileData.bio}</Text>
          <TouchableOpacity onPress={handleBookmarkPress} style={styles.bookmarkButton}>
            <Text style={styles.bookmarkButtonText}>{isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}</Text>
          </TouchableOpacity>
        </View>
        {/* Modal for success message */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Added to bookmarks successfully!</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 20,
    resizeMode: 'cover',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  details: {
    fontSize: 16,
    color: '#fff',
  },
  bio: {
    marginTop: 20,
    textAlign: 'center',
    color: '#fff',
  },
  bookmarkButton: {
    backgroundColor: '#FF7675',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  bookmarkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
});

export default ProfileDetails;
