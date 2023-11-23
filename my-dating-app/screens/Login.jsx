import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ImageBackground } from 'react-native';

export default function Login() {
  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-photo/composition-valentine-s-day-bouquet-red-roses-hearts-pink-background-copyspace_163828-1402.jpg' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Find Your Love</Text>
        </View>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/originals/33/11/cc/3311cc0dd3f9867df8adc7b1c3e5cd16.gif',
            }}
            style={styles.image}
          />
        </View>

        {/* Input and Button Section */}
        <View style={styles.inputContainer}>
          <TextInput placeholder="Email" style={styles.loginTextInput} />
          <TextInput placeholder="Password" style={styles.loginTextInput} secureTextEntry={true} />
          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>LOG IN</Text>
          </Pressable>
        </View>

        {/* Sign Up Section */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <Pressable>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 50,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    fontStyle: 'italic',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loginTextInput: {
    borderWidth: 1,
    borderColor: '#F4F4F4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loginButton: {
    backgroundColor: '#FF7675',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    marginRight: 10,
  },
  signUpLink: {
    color: '#FF7675',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
