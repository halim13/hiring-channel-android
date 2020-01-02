import React from 'react';
// import ProfileScreen from '../../screens/engineer/profile';
import ProfileScreen from '../../public/navigation/profileEngineerStack';
import CompaniesScreen from '../../public/navigation/engineersStack';
import MessagesScreen from '../../screens/engineer/messages';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

export default createMaterialBottomTabNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon name="user" size={20} color={focused ? '#FFF' : '#444'} />
        ),
      },
    },
    Companies: {
      screen: CompaniesScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon name="users" size={20} color={focused ? '#FFF' : '#444'} />
        ),
      },
    },
    Messages: {
      screen: MessagesScreen,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <Icon name="wechat" size={20} color={focused ? '#FFF' : '#444'} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Companies',
    activeColor: '#fff',
    barStyle: {backgroundColor: '#1ABC9C'},
    backBehavior: 'none',
    shifting: true,
  },
);
