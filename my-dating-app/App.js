import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import SwipeImage from './screens/SwipeImage';
import { NavigationContainer } from "@react-navigation/native";
import ProfilesDetails from './screens/ProfileDetails';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Bookmark from './screens/Bookmark';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          title: "Swipe Image"
        }}
        name='Swipe Image'
        component={SwipeImage}
      />
      <Tab.Screen
        options={{
          title: "Bookmark"
        }}
        name='Bookmark'
        component={Bookmark}
      />
      {/* <Tab.Screen
        options={{
          title: "Profile"
        }}
        name='Profile'
        component={ProfilesDetails}
      /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
     <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fff"
            },
            contentStyle: {
              backgroundColor: "#220577dd"
            }
          }}
        >
          <Stack.Screen
            options={{
              headerShown: false
            }}
            name='BottomTabs'
            component={BottomTabs}
          />
          <Stack.Screen
            options={{
              title: "Profile Details",
            }}
            name='ProfileDetails'
            component={ProfilesDetails}
          />
        </Stack.Navigator>
      </NavigationContainer> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
