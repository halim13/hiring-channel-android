import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import {validationService} from '../../public/validation/service';
import JWT from 'jwt-decode';

import {StackActions, NavigationActions} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {login} from '../../public/redux/action/auth';

class FormLogin extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor() {
    super();
    this.state = {
      inputs: {
        username: {
          type: 'username',
          value: '',
        },
        password: {
          type: 'password2',
          value: '',
        },
      },
      usernameError: '',
      passwordError: '',
      loading: false,
      error: false,
    };

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.submit = this.submit.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  UNSAFE_componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  async submit() {
    await this.getFormValidation();
    const {username, password} = this.state.inputs;
    const data = {
      username: username.value,
      password: password.value,
    };
    if (username.value && password.value) {
      try {
        await this.props.login(data);
        const {token} = this.props.token;
        const decode = JWT(token);
        const locations = decode.role === 'engineer' ? 'Engineer' : 'Company';

        Alert.alert(
          'Success!',
          'Login Success!',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate(locations);
              },
            },
          ],
          {cancelable: false},
        );
      } catch (error) {
        const {messageError} = this.props;
        Alert.alert(
          'Failed!',
          messageError,
          [
            {
              text: 'OK',
              onPress: () => {
                this.username.focus();
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  }

  componentDidMount() {
    {
      const {user, navigation} = this.props;
      if (user) {
        const location =
          user.role === 'engineer'
            ? 'Companies'
            : user.role === 'company'
            ? 'Engineers'
            : 'Login';
        navigation.navigate(location);
      }
    }
  }

  renderError(id) {
    const {inputs} = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../public/images/images.jpeg')}
        />
        {this.props.isLoading && (
          <Spinner
            visible={this.props.isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        )}
        {/* {!this.props.isLoading && ( */}
        <>
          <View>
            <TextInput
              autoFocus={this.props.user ? false : true}
              ref={el => (this.username = el)}
              style={styles.textInput}
              placeholder="Username"
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={value => {
                this.onInputChange({id: 'username', value});
              }}
              onSubmitEditing={val => {
                this.password.focus();
              }}
            />
            {this.renderError('username')}
          </View>
          <View>
            <TextInput
              ref={el => (this.password = el)}
              secureTextEntry
              style={[styles.textInput]}
              placeholder="Password"
              returnKeyType="go"
              onChangeText={value => {
                this.onInputChange({id: 'password', value});
              }}
              onSubmitEditing={this.submit}
            />
            {this.renderError('password')}
          </View>

          <TouchableOpacity style={styles.buttonStyle} onPress={this.submit}>
            <Text style={styles.textSignup}>Login</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={styles.instructions}>Don’t have account? </Text>
            <TouchableOpacity
              onPress={() => {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: 'Register'}),
                  ],
                });
                this.props.navigation.dispatch(resetAction);
                // this.props.navigation.navigate('Register');
              }}>
              <Text style={styles.register}>Register</Text>
            </TouchableOpacity>
          </View>
        </>
        {/* )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ABC9C',
    flexDirection: 'column',
  },
  textInput: {
    height: 40,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    color: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    width: 350,
  },
  buttonStyle: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: 350,
  },
  textSignup: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#1ABC9C',
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    marginTop: 10,
  },
  row: {flexDirection: 'row'},
  register: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  error: {
    marginBottom: 5,
    color: 'red',
    fontSize: 12,
  },
  image: {width: 250, height: 200},
});

const mapStateToProps = state => ({
  user: state.login.user,
  token: state.login.items.data,
  isLoading: state.login.isLoading,
  isError: state.login.isError,
  messageError: state.login.error,
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
});
// export default FormLogin;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormLogin);
