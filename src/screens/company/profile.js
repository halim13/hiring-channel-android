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
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  fetchSingleData,
  deleteCompany,
} from '../../public/redux/action/companies';
import {connect} from 'react-redux';
import config from '../../public/config/config';
import {logout} from '../../public/redux/action/auth';
import defaultPhoto from '../../public/images/default.png';

class profile extends Component {
  componentDidMount() {
    this.props.fetch(this.props.user.id);
  }
  render() {
    const {company} = this.props;
    const photo = company.logo
      ? `${config.BASE_URL}/companies/${company.logo}`
      : defaultPhoto;
    const name = company.name ? company.name : '';
    const location = company.location ? company.location : '';
    const email = company.email ? company.email : '';
    const no_contact = company.no_contact ? company.no_contact : '';
    const description = company.description ? company.description : '';
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />
          <Image style={styles.avatar} source={{uri: `${photo}`}} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.row}>
                <Icon name="map-marker" size={17} style={styles.text} />
                <Text style={styles.text}>{location}</Text>
              </View>
              <View style={styles.row}>
                <Icon name="phone" size={17} style={styles.text} />
                <Text style={styles.text}>{no_contact}</Text>
              </View>
              <View style={styles.row}>
                <Icon name="envelope" size={17} style={styles.text} />
                <Text style={styles.text}>{email}</Text>
              </View>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.buttonContainerEdit}
                  onPress={() => {
                    this.props.navigation.navigate('EditProfileCompany');
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
                            this.props.navigation.popToTop();
                            await this.props.delete(this.props.company.user_id);
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}>
                  <Text style={styles.textButton}>Delete Account</Text>
                </TouchableOpacity>
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
    width: 302,
    borderRadius: 30,
    backgroundColor: '#777',
  },
  textButton: {
    fontSize: 17,
  },
  row: {flexDirection: 'row', marginBottom: 5},
  text: {
    color: '#444',
    marginRight: 5,
  },
  textCenter: {
    alignSelf: 'center',
    color: '#444',
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  company: state.singleCompany.items,
  isLoading: state.singleCompany,
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch(fetchSingleData(id)),
  delete: id => dispatch(deleteCompany(id)),
  logout: id => dispatch(logout()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(profile);
