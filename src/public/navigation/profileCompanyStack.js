import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ProfileCompanyScreen from '../../screens/company/profile';
import EditProfileScreen from '../../screens/company/ModalEdit';

const AppNavigator = createStackNavigator(
  {
    ProfileCompany: {
      screen: ProfileCompanyScreen,
      headerMode: 'none',
      navigationOptions: {
        headerShown: false,
      },
    },
    EditProfileCompany: {
      screen: EditProfileScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ProfileCompany',
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
