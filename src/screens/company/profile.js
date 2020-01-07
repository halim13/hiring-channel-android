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
import ImagePicker from 'react-native-image-picker';
import {
  updateEngineer,
  clearSingleEngineer,
} from '../../public/redux/action/companies';
import {clearEngineers} from '../../public/redux/action/engineers';

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      old_logo: this.props.company.logo,
      no_contact: '',
      email: '',
      location: '',
      description: '',
      logo: `${config.BASE_URL}/companies/${this.props.company.logo}`,
      filename: '',
      filesize: '',
      user_id: this.props.user.id,
      showcases: [],
      isUpload: false,
    };
  }
  componentDidMount() {
    this.props.fetch(this.props.user.id);
  }
  selectImage = async () => {
    ImagePicker.showImagePicker(
      {
        noData: true,
        mediaType: 'photo',
        allowsEditing: true,
      },
      response => {
        console.log('response = ', response);
        if (response.didCancel) {
          console.log('user cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker error: ', response.error);
        } else if (response.customButton) {
          console.log('user tapped custom button', response.customButton);
        } else {
          this.setState({
            logo: response.uri,
            filename: response.fileName,
            filesize: response.fileSize,
          });
          const fileSize = response.fileSize;
          const size = 1 * 1024 * 1024;
          if (fileSize >= size) {
            this.setState({
              photo: `${config.BASE_URL}/companies/${this.props.company.logo}`,
            });
            Alert.alert('File Too big, choose image under 1MB');
          } else {
            const fileType = response.fileName.split('.')[1];
            this.uploadImage(response.uri, fileType);
          }
        }
      },
    );
  };

  uploadImage = async (image_uri, fileType) => {
    this.setState({isUpload: true});
    const {company} = this.props;
    let fd = new FormData();
    fd.append('name', company.name ? company.name : '');
    fd.append(
      'date_of_birth',
      company.date_of_birth ? company.date_of_birth.split('T')[0] : null,
    );
    fd.append('old_logo', company.photo);
    fd.append('no_contact', company.no_contact ? company.no_contact : '');
    fd.append('email', company.email ? company.email : '');
    fd.append('location', company.location ? company.location : '');
    fd.append('description', company.description ? company.description : '');
    fd.append('logo', {
      type: 'image/' + fileType,
      uri: image_uri,
      name: 'company.' + fileType,
    });
    const token = this.props.token.data.token;
    const configs = {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: 'Bearer ' + token,
      },
    };
    await this.props
      .update(this.props.user.id, fd, configs)
      .then(() => {
        this.setState({isUpload: false});
      })
      .catch(() => {
        this.setState({isUpload: false});
      });
    // await this.props.fetch(this.props.user.id);
    // this.setState({old_logo: engineer.photo});
  };

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
