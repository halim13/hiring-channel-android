import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import config from '../../public/config/config';
import {connect} from 'react-redux';
import {
  fetchSingleData,
  deleteEngineer,
} from '../../public/redux/action/engineers';
import {logout} from '../../public/redux/action/auth';
import defaultPhoto from '../../public/images/default.png';
import moment from 'moment';

class profile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.fetch(this.props.user.id);
  }
  render() {
    const {engineer} = this.props;
    const photo = engineer.photo
      ? `${config.BASE_URL}/engineers/${engineer.photo}`
      : defaultPhoto;
    const name = engineer.name ? engineer.name : '';
    const specialist = engineer.specialist ? engineer.specialist : '';
    const location = engineer.location ? engineer.location : '';
    const date_of_birth = engineer.date_of_birth
      ? moment(engineer.date_of_birth.split('T')[0], 'YYYY-MM-DD').format(
          'D MMMM YYYY',
        )
      : '';
    const email = engineer.email ? engineer.email : '';
    const no_contact = engineer.no_contact ? engineer.no_contact : '';
    const skills = engineer.skills ? engineer.skills : '';
    const expected_salary = engineer.expected_salary
      ? engineer.expected_salary
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      : '';
    const description = engineer.description ? engineer.description : '';
    const showcase = engineer.showcases ? engineer.showcases : [];
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />
          <Image style={styles.avatar} source={{uri: `${photo}`}} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.info}>{specialist}</Text>
              <View style={styles.row}>
                <Text style={styles.text}>Location : {location}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Date of Birth : {date_of_birth}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Contact : {no_contact}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Email : {email}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Skills: {skills}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  Expected Salary: Rp. {expected_salary}
                </Text>
              </View>
              <Text style={styles.description}>
                Description : {description}
              </Text>
              <Text style={styles.textCenter}>Showcase</Text>

              <View style={styles.center}>
                <View style={styles.row}>
                  {showcase.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.show}>
                      <Text style={styles.textShowcase}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.center}>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.buttonContainerEdit}
                    onPress={() => {
                      this.props.navigation.navigate('EditProfileEngineer');
                    }}>
                    <Text style={styles.textButton}>Edit Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainerDelete}
                    onPress={() => {
                      Alert.alert(
                        'Delete Account',
                        'Are you sure? This action cannot be undo',
                        [
                          {
                            text: 'Cancel',
                            // onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: async () => {
                              await this.props.logout();
                              await this.props.delete(
                                this.props.engineer.user_id,
                              );
                              this.props.navigation.popToTop();
                            },
                          },
                        ],
                        {cancelable: false},
                      );
                    }}>
                    <Text style={styles.textButton}>Delete Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonContainerLogout}
                onPress={() => {
                  Alert.alert(
                    'Logout',
                    'Are you sure?',
                    [
                      {
                        text: 'No',
                        // onPress: () => console.log('No Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: async () => {
                          // console.log('Yes Pressed');
                          await this.props.logout();
                          this.props.navigation.popToTop();
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }}>
                <Text style={styles.textButton}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1ABC9C',
    height: 100,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 20,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    alignSelf: 'center',
  },
  info: {
    fontSize: 16,
    color: '#1abc4b',
    alignSelf: 'center',
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'left',
  },
  buttonContainerEdit: {
    marginTop: 10,
    marginRight: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    borderRadius: 30,
    backgroundColor: '#1ABC9C',
  },
  buttonContainerDelete: {
    marginTop: 10,
    marginLeft: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    borderRadius: 30,
    backgroundColor: '#e54a61',
  },
  buttonContainerLogout: {
    marginLeft: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 302,
    borderRadius: 30,
    backgroundColor: '#777',
  },
  textButton: {
    fontSize: 17,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  text: {
    color: '#444',
    marginRight: 5,
  },
  textCenter: {
    alignSelf: 'center',
    color: '#444',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  center: {
    alignSelf: 'center',
  },
  textShowcase: {fontSize: 15, alignSelf: 'center'},
  show: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 5,
    paddingLeft: 5,
    marginRight: 3,
    marginBottom: 5,
    marginTop: 5,
  },
});

const mapStateToProps = state => ({
  engineer: state.singleEngineer.items,
  isLoading: state.singleEngineer,
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchSingleData(id)),
  delete: id => dispatch(deleteEngineer(id)),
  logout: id => dispatch(logout()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(profile);
