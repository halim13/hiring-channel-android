import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EngineersScreen from '../../screens/company/engineers';
import SingleEngineerScreen from '../../screens/company/singleEngineer';
import MessageScreen from '../../screens/company/messages';

const AppNavigator = createStackNavigator(
  {
    Engineers: {
      screen: EngineersScreen,
      headerMode: 'none',
      navigationOptions: {
        headerShown: false,
      },
    },
    SingleEngineer: {
      screen: SingleEngineerScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    MessageEngineer: {
      screen: MessageScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Engineers',
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
