import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.home}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
              title: 'title',
            });
          }}
        />
      </View>
    );
  }
}

class DetailsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', 'Details'),
    };
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.home}>
        <Text>DetailsScreen</Text>
        <Text>
          itemId:{JSON.stringify(navigation.getParam('itemId', 'NO-ID'))}
        </Text>
        <Text>
          otherParam:
          {JSON.stringify(navigation.getParam('otherParam', 'default value'))}
        </Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Go to Top"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      headerMode: 'none',
      navigationOptions: {
        headerShown: false,
      },
    },
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
