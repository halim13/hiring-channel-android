import React from 'react';
import ProfileScreen from '../../public/navigation/profileCompanyStack';
import EngineersScreen from '../../public/navigation/companiesStack';
import MessagesScreen from '../../screens/company/messages';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    Engineers: {
      screen: EngineersScreen,
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
    initialRouteName: 'Engineers',
    barStyle: {backgroundColor: '#1ABC9C'},
    activeColor: '#fff',
    backBehavior: 'none',
    shifting: true,
  },
);
