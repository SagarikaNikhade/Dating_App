import { StyleSheet, Text, View } from 'react-native';

export default function SwipeChoices({ type }) {
    return (
        <View style={type === 'LIKE' ? styles.likeButton : styles.dislikeButton}>
            <Text style={styles.choiceText}>{type}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    likeButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
      },
      dislikeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
      },
      choiceText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize:20,
      },
});
