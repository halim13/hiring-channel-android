import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CompaniesScreen from '../../screens/engineer/companies';
import SingleCompanyScreen from '../../screens/engineer/singleCompany';
import MessageScreen from '../../screens/engineer/messages';

const AppNavigator = createStackNavigator(
  {
    Companies: {
      screen: CompaniesScreen,
      headerMode: 'none',
      navigationOptions: {
        headerShown: false,
      },
    },
    SingleCompany: {
      screen: SingleCompanyScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    MessageCompany: {
      screen: MessageScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Companies',
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
