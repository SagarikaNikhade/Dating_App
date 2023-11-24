import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Animated, StyleSheet, Text, View, PanResponder, TouchableOpacity, Image } from 'react-native';
import SwipeCards from './SwipeCards';

export default function SwipeImage({ children }) {
  const [data, setData] = useState([]);
  const swipe = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://expensive-tan-dolphin.cyclic.app/profile');
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy }) => {
      swipe.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      let direction = Math.sign(dx);
      let IsActiveAction = Math.abs(dx) > 200;
      if (IsActiveAction) {
        Animated.timing(swipe, {
          toValue: { x: 500 * dx, y: dy },
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeCard = useCallback(() => {
    setData((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleSwipeUsingBtn = useCallback(
    (direction) => {
      Animated.timing(swipe, {
        toValue: { x: direction * 500, y: 0 },
        useNativeDriver: true,
        duration: 500,
      }).start(removeCard);
    },
    [removeCard],
  );

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        let isFirst = index === 0;
        let dragHandler = isFirst ? panResponder.panHandlers : {};
        return <SwipeCards key={item.id} item={item} isFirst={isFirst} swipe={swipe} {...dragHandler} />;
      }).reverse()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.lastButton}
          onPress={() => {
            handleSwipeUsingBtn(-1);
          }}
        >
          <Image
            source={{ uri: 'https://png.pngtree.com/png-clipart/20210414/ourmid/pngtree-broken-heart-png-png-image_3219347.jpg' }}
            style={{ width: 30, height: 30, backgroundColor: '#fff' }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lastButton1}
          onPress={() => {
            handleSwipeUsingBtn(1);
          }}
        >
          <Image
            source={{
              uri: 'https://t3.ftcdn.net/jpg/00/19/89/58/360_F_19895879_uZ0tHguWowgKxb7jgUzuJk7IdXJCYZkI.jpg',
            }}
            style={{ width: 30, height: 30, backgroundColor: '#fff' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    height: 100,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  lastButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    marginRight: 10,
  },
  lastButton1: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
});
