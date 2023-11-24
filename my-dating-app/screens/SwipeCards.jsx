import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Animated,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SwipeChoices from './SwipeChoices';
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get('window')

export default function SwipeCards({ item, isFirst, swipe, ...rest }) {
  const navigation = useNavigation();

  const handleOnPress = (getId) => {
    console.log(getId)
    navigation.navigate("ProfilesDetails", {
      profileId: getId
    })
  }

  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dislikeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  const swipeChoices = useCallback(() => {
    return (
      <View style={styles.choicesContainer}>
        <Animated.View style={{
          position: 'absolute', bottom: 20, left: 20,
          opacity: likeOpacity,
          transform: [{ rotate: "-30deg" }]
        }}>
          <SwipeChoices type={'LIKE'} />
        </Animated.View>
        <Animated.View style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          opacity: dislikeOpacity,
          transform: [{ rotate: "30deg" }]
        }}>
          <SwipeChoices type={'DISLIKE'} />
        </Animated.View>
      </View>
    )
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.container,
        ...(isFirst && { transform: [...swipe.getTranslateTransform(), { rotate: rotate }] }),
      }}
      {...rest}
    >
      <Image source={{ uri: item.image }} 
      style={styles.imageProfile} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.overlay}
      >
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        {/* <TouchableOpacity onPress={() => handleOnPress(item.id)}> 
          <Text style={styles.location}>profile</Text>
         </TouchableOpacity> */}
      </LinearGradient>
      {isFirst && swipeChoices()}
    </Animated.View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: height - 200,
    alignSelf: 'center',
    position: 'absolute',
    top: 40,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: 80,
    paddingLeft: 30,
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#fff',
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});
