import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {validationService} from '../../public/validation/serviceForm';

import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {updateCompany} from '../../public/redux/action/companies';

class ModalEdit extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        name: {
          type: 'name',
          value: this.props.company.name,
        },
        description: {
          type: 'description',
          value: this.props.company.description,
        },
        no_contact: {
          type: 'phone',
          value: this.props.company.no_contact,
        },
        email: {
          type: 'email',
          value: this.props.company.email,
        },
        location: {
          type: 'location',
          value: this.props.company.location,
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
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  async submit() {
    this.getFormValidation();
    const {name, no_contact, email, location, description} = this.state.inputs;
    // const {old_photo} = this.state;

    const data = {
      name: name.value,
      old_logo: this.props.company.logo,
      // logo: this.props.company.logo,
      no_contact: no_contact.value,
      email: email.value,
      location: location.value,
      description: description.value,
    };
    const {token} = this.props.token;
    const config = {
      headers: {
        Accept: 'application/json',
        // 'content-type': 'multipart/form-data',
        authorization: 'Bearer ' + token,
      },
    };
    if (
      name.value &&
      no_contact.value &&
      no_contact.value.length > 10 &&
      email.value &&
      location.value &&
      description.value
    ) {
      try {
        await this.props.update(this.props.user.id, data, config);
        Alert.alert(
          'Success!',
          'Update Profile Success!',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('ProfileCompany');
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
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
      }
    }
  }

  componentDidMount() {}

  renderError(id) {
    const {inputs} = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  render() {
    const {company} = this.props;
    return (
      <View style={styles.container}>
        {this.props.isLoading && (
          <Spinner
            visible={this.props.isLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        )}
        {!this.props.isLoading && (
          <>
            <Header style={styles.header}>
              <Left>
                <Button
                  transparent
                  onPress={() => {
                    this.props.navigation.navigate('ProfileCompany');
                  }}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>Edit Profile</Title>
              </Body>
              <Right />
            </Header>
            <ScrollView>
              {/* name */}
              <View>
                <TextInput
                  autoFocus={true}
                  ref={el => (this.name = el)}
                  style={styles.textInput}
                  placeholder="Name"
                  defaultValue={company.name}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={value => {
                    this.onInputChange({id: 'name', value});
                  }}
                  onSubmitEditing={val => {
                    this.no_contact.focus();
                  }}
                />
                {this.renderError('name')}
              </View>
              {/* no_contact */}
              <View>
                <TextInput
                  ref={el => (this.no_contact = el)}
                  style={styles.textInput}
                  placeholder="No Contact"
                  defaultValue={company.no_contact}
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="number-pad"
                  onChangeText={value => {
                    this.onInputChange({id: 'no_contact', value});
                  }}
                  onSubmitEditing={val => {
                    this.email.focus();
                  }}
                />
                {this.renderError('no_contact')}
              </View>
              {/* email */}
              <View>
                <TextInput
                  ref={el => (this.email = el)}
                  style={styles.textInput}
                  placeholder="Email"
                  defaultValue={company.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={value => {
                    this.onInputChange({id: 'email', value});
                  }}
                  onSubmitEditing={val => {
                    this.location.focus();
                  }}
                />
                {this.renderError('email')}
              </View>
              {/* location */}
              <View>
                <TextInput
                  ref={el => (this.location = el)}
                  style={styles.textInput}
                  placeholder="Location"
                  autoCapitalize="none"
                  defaultValue={company.location}
                  returnKeyType="next"
                  onChangeText={value => {
                    this.onInputChange({id: 'location', value});
                  }}
                  onSubmitEditing={val => {
                    this.description.focus();
                  }}
                />
                {this.renderError('location')}
              </View>
              {/* description */}
              <View>
                <TextInput
                  ref={el => (this.description = el)}
                  style={styles.textInput}
                  placeholder="Description"
                  autoCapitalize="none"
                  multiline={true}
                  height={100}
                  defaultValue={company.description}
                  returnKeyType="done"
                  onChangeText={value => {
                    this.onInputChange({id: 'description', value});
                  }}
                />
                {this.renderError('description')}
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.submit}>
                <Text style={styles.textSignup}>Edit</Text>
              </TouchableOpacity>
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1ABC9C',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  textInput: {
    height: 40,
    borderBottomColor: '#777',
    borderBottomWidth: 1,
    color: '#000',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    width: 350,
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: '#1ABC9C',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    width: 350,
  },
  textSignup: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    marginTop: 10,
  },
  row: {flexDirection: 'row'},
  error: {
    marginBottom: 5,
    color: 'red',
    fontSize: 12,
  },
});

const mapStateToProps = state => ({
  company: state.singleCompany.items,
  isLoading: state.singleCompany.isLoading,
  messageError: state.singleCompany.messageError,
  user: state.login.user,
  token: state.login.items.data.token,
});

const mapDispatchToProps = dispatch => ({
  update: (id, data, config) => dispatch(updateCompany(id, data, config)),
});
// export default ModalEdit;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalEdit);
