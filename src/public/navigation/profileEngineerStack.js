import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileEngingeerScreen from '../../screens/engineer/profile';
import EditProfileScreen from '../../screens/engineer/ModalEdit';

const AppNavigator = createStackNavigator(
  {
    ProfileEngingeer: {
      screen: ProfileEngingeerScreen,
      headerMode: 'none',
      navigationOptions: {
        headerShown: false,
      },
    },
    EditProfileEngineer: {
      screen: EditProfileScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ProfileEngingeer',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#008b6e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
