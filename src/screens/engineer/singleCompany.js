import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';

const SingleCompany = props => {
  const {navigation} = props;
  const image = navigation.getParam(
    'image',
    'https://via.placeholder.com/210x295.png?text=No+Image',
  );
  const title = navigation.getParam('name', '-');
  const description = navigation.getParam('description', '-');
  const location = navigation.getParam('location', '-');
  const email = navigation.getParam('email', '-');
  const no_contact = navigation.getParam('no_contact', '-');
  // const companies = navigation.getParam('allProps', {});

  return (
    <>
      <Header style={styles.header}>
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right />
      </Header>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header} />
          <Image style={styles.avatar} source={{uri: image}} />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{title}</Text>
              <View style={styles.row}>
                <Icons name="map-marker" size={17} style={styles.text} />
                <Text style={styles.text}>{location}</Text>
              </View>
              <View style={styles.row}>
                <Icons name="phone" size={17} style={styles.text} />
                <Text style={styles.text}>{no_contact}</Text>
              </View>
              <View style={styles.row}>
                <Icons name="envelope" size={17} style={styles.text} />
                <Text style={styles.text}>{email}</Text>
              </View>
              <Text style={styles.description}>
                Description : {description}
              </Text>
              <TouchableOpacity
                style={styles.buttonContainerLogout}
                onPress={() => {}}>
                <Text style={styles.textButton}>Message Company</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SingleCompany;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1ABC9C',
    height: 50,
  },
  avatar: {
    width: 150,
    height: 150,
    // borderRadius: 100,
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
    marginTop: 50,
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
    marginTop: 10,
    marginLeft: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 302,
    borderRadius: 30,
    backgroundColor: '#ffaf49',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    alignSelf: 'center',
  },
});
