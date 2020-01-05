import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileEngineerScreen from '../../screens/engineer/profile';
import EditProfileScreen from '../../screens/engineer/ModalEdit';

const AppNavigator = createStackNavigator(
  {
    ProfileEngineer: {
      screen: ProfileEngineerScreen,
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
    initialRouteName: 'ProfileEngineer',
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
