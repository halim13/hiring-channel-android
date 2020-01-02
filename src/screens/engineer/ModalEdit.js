import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import {validationService} from '../../public/validation/serviceForm';

import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {connect} from 'react-redux';
import {updateEngineer} from '../../public/redux/action/engineers';

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
          value: this.props.engineer.name,
        },
        expected_salary: {
          type: 'expectedSalary',
          value: this.props.engineer.expected_salary,
        },
        description: {
          type: 'description',
          value: this.props.engineer.description,
        },
        skills: {
          type: 'skills',
          value: this.props.engineer.skills,
        },
        specialist: {
          type: 'specialist',
          value: this.props.engineer.specialist,
        },
        no_contact: {
          type: 'phone',
          value: this.props.engineer.no_contact,
        },
        email: {
          type: 'email',
          value: this.props.engineer.email,
        },
        location: {
          type: 'location',
          value: this.props.engineer.location,
        },
        date_of_birth: {
          type: 'date_of_birth',
          value: this.props.engineer.date_of_birth,
        },
      },
      usernameError: '',
      passwordError: '',
      loading: false,
      error: false,
      date: new Date(),
      mode: 'date',
      show: false,
    };

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.submit = this.submit.bind(this);

    this.setDate = this.setDate.bind(this);
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  };

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
    const {
      name,
      no_contact,
      email,
      location,
      skills,
      specialist,
      description,
      expected_salary,
    } = this.state.inputs;
    const {date} = this.state;
    let fd = new FormData();
    fd.append('name', name.value);
    fd.append('user_id', this.props.user.id);
    fd.append('old_photo', this.props.engineer.photo);
    fd.append('date_of_birth', date);
    fd.append('no_contact', no_contact.value);
    fd.append('email', email.value);
    fd.append('location', location.value);
    fd.append('skills', skills.value);
    fd.append('specialist', specialist.value);
    fd.append('description', description.value);
    fd.append('expected_salary', expected_salary.value);

    const data = {
      name: name.value,
      date_of_birth: date,
      no_contact: no_contact.value,
      email: email.value,
      location: location.value,
      skills: skills.value,
      specialist: specialist.value,
      description: description.value,
      expected_salary: expected_salary.value,
    };
    const {token} = this.props.token;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        authorization: 'Bearer ' + token,
      },
    };
    if (
      name.value &&
      date &&
      no_contact.value &&
      email.value &&
      location.value &&
      skills.value &&
      specialist.value &&
      description.value &&
      expected_salary.value
    ) {
      try {
        await this.props.update(this.props.user.id, fd, config);
        Alert.alert(
          'Success!',
          'Update Profile Success!',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('ProfileEngingeer');
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
    const {show, date, mode} = this.state;

    const {engineer} = this.props;
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
                    this.props.navigation.navigate('ProfileEngingeer');
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
                  defaultValue={engineer.name}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={value => {
                    this.onInputChange({id: 'name', value});
                  }}
                  onSubmitEditing={val => {
                    this.date_of_birth.focus();
                    this.datepicker();
                  }}
                />
                {this.renderError('name')}
              </View>
              {/* date_of_birth */}
              <View>
                <TextInput
                  ref={el => (this.date_of_birth = el)}
                  style={styles.textInput}
                  placeholder="Date Of Birth"
                  autoCapitalize="none"
                  returnKeyType="next"
                  defaultValue={moment(
                    engineer.date_of_birth.toString().split('T')[0],
                    'YYYY-MM-DD',
                  ).format('D MMMM YYYY')}
                  onTouchStart={this.datepicker}
                  onChangeText={value => {
                    this.onInputChange({id: 'date_of_birth', value});
                  }}
                  onSubmitEditing={val => {
                    this.no_contact.focus();
                  }}
                />
                {this.renderError('date_of_birth')}
              </View>
              {/* no_contact */}
              <View>
                <TextInput
                  ref={el => (this.no_contact = el)}
                  style={styles.textInput}
                  placeholder="No Contact"
                  defaultValue={engineer.no_contact}
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
                  defaultValue={engineer.email}
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
                  defaultValue={engineer.location}
                  returnKeyType="next"
                  onChangeText={value => {
                    this.onInputChange({id: 'location', value});
                  }}
                  onSubmitEditing={val => {
                    this.skills.focus();
                  }}
                />
                {this.renderError('location')}
              </View>
              {/* skills */}
              <View>
                <TextInput
                  ref={el => (this.skills = el)}
                  style={styles.textInput}
                  placeholder="Skills"
                  autoCapitalize="none"
                  defaultValue={engineer.skills}
                  returnKeyType="next"
                  onChangeText={value => {
                    this.onInputChange({id: 'skills', value});
                  }}
                  onSubmitEditing={val => {
                    this.specialist.focus();
                  }}
                />
                {this.renderError('skills')}
              </View>
              {/* specialist */}
              <View>
                <TextInput
                  ref={el => (this.specialist = el)}
                  style={styles.textInput}
                  placeholder="Specialist"
                  autoCapitalize="none"
                  defaultValue={engineer.specialist}
                  returnKeyType="next"
                  onChangeText={value => {
                    this.onInputChange({id: 'specialist', value});
                  }}
                  onSubmitEditing={val => {
                    this.description.focus();
                  }}
                />
                {this.renderError('specialist')}
              </View>
              {/* description */}
              <View>
                <TextInput
                  ref={el => (this.description = el)}
                  style={styles.textInput}
                  placeholder="Description"
                  autoCapitalize="none"
                  defaultValue={engineer.description}
                  returnKeyType="next"
                  onChangeText={value => {
                    this.onInputChange({id: 'description', value});
                  }}
                  onSubmitEditing={val => {
                    this.expected_salary.focus();
                  }}
                />
                {this.renderError('description')}
              </View>
              {/* expected_salary */}
              <View>
                <TextInput
                  ref={el => (this.expected_salary = el)}
                  style={styles.textInput}
                  placeholder="Expected Salary"
                  keyboardType="number-pad"
                  defaultValue={engineer.expected_salary.toString()}
                  autoCapitalize="none"
                  returnKeyType="send"
                  onChangeText={value => {
                    this.onInputChange({id: 'expected_salary', value});
                  }}
                  onSubmitEditing={val => {
                    // this.password.focus();
                  }}
                />
                {this.renderError('expected_salary')}
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.submit}>
                <Text style={styles.textSignup}>Edit</Text>
              </TouchableOpacity>
            </ScrollView>

            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                display="spinner"
                onChange={this.setDate}
              />
            )}
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
  engineer: state.singleEngineer.items,
  isLoading: state.singleEngineer.isLoading,
  messageError: state.singleEngineer.messageError,
  user: state.login.user,
  token: state.login.items.data.token,
});

const mapDispatchToProps = dispatch => ({
  update: (id, data, config) => dispatch(updateEngineer(id, data, config)),
});
// export default ModalEdit;
export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
