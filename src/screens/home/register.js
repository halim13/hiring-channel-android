import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  // Image,
  Picker,
  Alert,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {validationService} from '../../public/validation/service';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {register} from '../../public/redux/action/auth';

class FormSignUp extends Component {
  static navigationOptions = {
    title: 'Register',
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
          type: 'password',
          value: '',
        },
        passwordConfirmation: {
          type: 'passwordConfirmation',
          value: '',
        },
        role: {
          type: 'role',
          value: '',
        },
      },
      usernameError: '',
      passwordError: '',
      roleError: '',
      loading: false,
      error: false,
    };

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.submit = this.submit.bind(this);
  }

  async submit() {
    this.setState({
      loading: true,
      roleError: true,
    });
    this.getFormValidation();
    const {username, password, passwordConfirmation, role} = this.state.inputs;
    const data = {
      username: username.value,
      password: password.value,
      role: role.value,
    };

    if (
      username.value &&
      password.value.length >= 6 &&
      password.value === passwordConfirmation.value &&
      role.value
    ) {
      try {
        await this.props.register(data);
        Alert.alert(
          'Success!',
          'Register Success!',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('Login');
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
  login = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  renderErrorConfirm(id) {
    if (this.state.inputs.passwordConfirmation.value) {
      if (
        this.state.inputs.passwordConfirmation.value !==
        this.state.inputs.password.value
      ) {
        return <Text style={styles.error}>Password not match</Text>;
      }
    }

    return null;
  }

  renderErrorUsername(id) {
    if (this.state.usernameError) {
      return <Text style={styles.error}>{this.state.usernameError}</Text>;
    }

    return null;
  }

  renderErrorRole(id) {
    if (!this.state.inputs.role.value && this.state.roleError) {
      return <Text style={styles.error}>Role is required</Text>;
    }

    return null;
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
        {/* <Image
          style={{marginBottom: 50, width: 70, height: 70}}
          source={require('./asset/icon-app.png')}
        /> */}
        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View>
          <TextInput
            ref={el => (this.username = el)}
            autoFocus={true}
            style={styles.textInput}
            placeholder="Username"
            autoCapitalize="none"
            returnKeyType="next"
            onChangeText={value => {
              this.onInputChange({id: 'username', value});
              this.setState({
                usernameError: '',
              });
            }}
            onSubmitEditing={val => {
              this.password.focus();
            }}
          />
          {this.renderError('username')}
          {this.renderErrorUsername('username')}
        </View>
        <View>
          <TextInput
            secureTextEntry
            style={[styles.textInput]}
            placeholder="Password"
            ref={el => (this.password = el)}
            returnKeyType="next"
            onChangeText={value => {
              this.onInputChange({id: 'password', value});
            }}
            onSubmitEditing={val => {
              this.passwordConfirmation.focus();
            }}
          />
          {this.renderError('password')}
        </View>
        <View>
          <TextInput
            secureTextEntry
            style={[styles.textInput]}
            placeholder="Password Confirmation"
            ref={el => (this.passwordConfirmation = el)}
            returnKeyType="next"
            onChangeText={value => {
              this.onInputChange({id: 'passwordConfirmation', value});
            }}
          />
          {this.renderError('passwordConfirmation')}
          {this.renderErrorConfirm('passwordConfirmation')}
        </View>

        <View style={[styles.textInput]}>
          <Picker
            mode="dropdown"
            ref={el => (this.role = el)}
            selectedValue={this.state.inputs.role.value}
            style={[styles.pickerInput]}
            onValueChange={(value, index) => {
              this.onInputChange({id: 'role', value});
            }}>
            <Picker.Item label="Select Role" />
            <Picker.Item label="Engineer" value="engineer" />
            <Picker.Item label="Company" value="company" />
          </Picker>
          {this.renderErrorRole('role')}
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={this.submit}>
          <Text style={styles.textSignup}>Register</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.instructions}>Have account? </Text>
          <TouchableOpacity onPress={this.login}>
            <Text style={styles.register}>Login</Text>
          </TouchableOpacity>
        </View>
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
    // borderWidth: 1,
    borderBottomWidth: 1,
    color: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    width: 350,
  },
  pickerInput: {
    height: 40,
    borderBottomColor: '#ffffff',
    // borderWidth: 1,
    borderBottomWidth: 1,
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
    marginBottom: 3,
    color: 'red',
    fontSize: 12,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

const mapStateToProps = state => ({
  isLoading: state.register.isLoading,
  isError: state.register.isError,
  messageError: state.register.error,
});

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(register(data)),
});
// export default FormLogin;
export default connect(mapStateToProps, mapDispatchToProps)(FormSignUp);
