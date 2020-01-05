import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import config from '../../public/config/config';
import {connect} from 'react-redux';
import {
  fetchSingleDataEngineer,
  deleteEngineer,
} from '../../public/redux/action/engineers';
import {logout} from '../../public/redux/action/auth';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import {
  updateEngineer,
  clearSingleEngineer,
} from '../../public/redux/action/engineers';
import {clearCompanies} from '../../public/redux/action/companies';

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date_of_birth: '',
      old_photo: this.props.engineer.photo,
      no_contact: '',
      email: '',
      location: '',
      description: '',
      skills: '',
      specialist: '',
      expected_salary: '',
      photo: `${config.BASE_URL}/engineers/${this.props.engineer.photo}`,
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
            photo: response.uri,
            filename: response.fileName,
            filesize: response.fileSize,
          });
          const fileSize = response.fileSize;
          const size = 1 * 1024 * 1024;
          // const fileType = response.fileName.split('.')[1];
          // console.warn(fileSize, size);
          if (fileSize >= size) {
            this.setState({
              photo: `${config.BASE_URL}/engineers/${
                this.props.engineer.photo
              }`,
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
    const {engineer} = this.props;
    let fd = new FormData();
    fd.append('name', engineer.name ? engineer.name : '');
    fd.append(
      'date_of_birth',
      engineer.date_of_birth ? engineer.date_of_birth.split('T')[0] : null,
    );
    fd.append('old_photo', engineer.photo);
    fd.append('no_contact', engineer.no_contact ? engineer.no_contact : '');
    fd.append('email', engineer.email ? engineer.email : '');
    fd.append('location', engineer.location ? engineer.location : '');
    fd.append('description', engineer.description ? engineer.description : '');
    fd.append('skills', engineer.skills ? engineer.skills : '');
    fd.append('specialist', engineer.specialist ? engineer.specialist : '');
    fd.append(
      'expected_salary',
      engineer.expected_salary ? engineer.expected_salary : 0,
    );
    fd.append('photo', {
      type: 'image/' + fileType,
      uri: image_uri,
      name: 'engineer.' + fileType,
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
    // this.setState({old_photo: engineer.photo});
  };

  render() {
    const {engineer} = this.props;
    const {photo} = this.state;
    const photos = photo ? photo : null;
    const names = engineer.name ? engineer.name : '';
    const specialists = engineer.specialist ? engineer.specialist : '';
    const locations = engineer.location ? engineer.location : '';
    const date_of_births = engineer.date_of_birth
      ? moment(engineer.date_of_birth.split('T')[0], 'YYYY-MM-DD').format(
          'D MMMM YYYY',
        )
      : null;
    const emails = engineer.email ? engineer.email : '';
    const no_contacts = engineer.no_contact ? engineer.no_contact : '';
    const skillss = engineer.skills ? engineer.skills : '';
    const expected_salarys = engineer.expected_salary
      ? engineer.expected_salary
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      : '';
    const descriptions = engineer.description ? engineer.description : '';
    const showcase = engineer.showcases ? engineer.showcases : [];
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />
          {engineer.photo ? (
            <Image style={styles.avatar} source={{uri: `${photos}`}} />
          ) : (
            !engineer.photo && (
              <Image
                style={styles.avatar}
                source={require('../../public/images/default.png')}
              />
            )
          )}

          <View style={styles.center}>
            {!this.state.isUpload && (
              <TouchableOpacity
                style={styles.changeImage}
                onPress={this.selectImage}>
                <Text style={styles.imageText}>Change Image</Text>
              </TouchableOpacity>
            )}
            {this.state.isUpload && (
              <View style={styles.changeImage}>
                <ActivityIndicator />
              </View>
            )}
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{names}</Text>
              <Text style={styles.info}>{specialists}</Text>
              <View style={styles.row}>
                <Text style={styles.text}>Location : {locations}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  Date of Birth : {date_of_births}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Contact : {no_contacts}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Email : {emails}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Skills: {skillss}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  Expected Salary: Rp. {expected_salarys}
                </Text>
              </View>
              <Text style={styles.description}>
                Description : {descriptions}
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
                      this.props.navigation.push('EditProfileEngineer');
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
                              await this.props.navigation.popToTop();
                              await this.props.delete(
                                this.state.user_id,
                                engineer.photo,
                              );
                              await this.props.logout();
                              await this.props.clearEngineer(engineer.user_id);
                              await this.props.clearCompanies();
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
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: async () => {
                          await this.props.navigation.popToTop();
                          await this.props.clearEngineer();
                          await this.props.clearCompanies();
                          await this.props.logout();
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
    marginTop: 80,
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
  changeImage: {
    top: 75,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#ddd',
    padding: 6,
    borderRadius: 20,
  },
  imageText: {
    color: '#333',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({
  engineer: state.singleEngineer.items,
  isLoading: state.singleEngineer,
  user: state.login.user,
  token: state.login.items,
});

const mapDispatchToProps = dispatch => ({
  clearEngineer: id => dispatch(clearSingleEngineer()),
  clearCompanies: id => dispatch(clearCompanies()),
  fetch: id => dispatch(fetchSingleDataEngineer(id)),
  delete: (id, photo) => dispatch(deleteEngineer(id, photo)),
  logout: id => dispatch(logout()),
  update: (id, data, configs) => dispatch(updateEngineer(id, data, configs)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(profile);
