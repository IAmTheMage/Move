import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FrontPage from './FrontPage'
import Profile from './Profile';

const Navigator = createBottomTabNavigator();

// import { Container } from './styles';

const HomeNavigation: React.FC = () => {
  return (
    <Navigator.Navigator 
    initialRouteName="FrontPage"
    tabBarOptions={{showLabel: false, style:{backgroundColor: "#0f0f0f", borderTopColor: "#0f0f0f"}}} 
    screenOptions={({route}) => ({
      tabBarIcon: (({focused, color, size}) => {
        let iconName: any = "";
        if(route.name == 'FrontPage') {
          iconName = "home";
        }
        if(route.name == "Profile") {
          iconName = "person";
        }
        return <MaterialIcons name={iconName} color={focused ? "#28d8a1" : "white"} size={25}></MaterialIcons>
      })
    })}>
      <Navigator.Screen component={FrontPage} name="FrontPage" />
      <Navigator.Screen component={Profile} name="Profile" />
    </Navigator.Navigator>
  );
}

export default HomeNavigation;