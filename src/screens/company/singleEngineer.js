import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';

const SingleEngineer = props => {
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
  // const engineers = navigation.getParam('allProps', {});

  const specialist = navigation.getParam('specialist', '-');
  const dob = navigation.getParam('date_of_birth', '-');
  const date_of_birth = dob
    ? moment(dob.split('T')[0], 'YYYY-MM-DD').format('D MMMM YYYY')
    : '';
  const skills = navigation.getParam('skills', '-');
  const salary = navigation.getParam('expected_salary', '-');
  const expected_salary = salary
    ? salary.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    : '';
  const showcase = navigation.getParam('showcases', '-');

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
              <Text style={styles.specialist}>{specialist}</Text>
              <View style={styles.row}>
                <Text style={styles.text}>Location : {location}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Date of Birth : {date_of_birth}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>No Contact : {no_contact}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Email : {email}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Skills : {skills}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  Expected Salary : Rp. {expected_salary}
                </Text>
              </View>
              <Text style={styles.description}>
                Description : {description}
              </Text>

              <View style={styles.center}>
                <View style={styles.row}>
                  {showcase.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.show}>
                      <Text style={styles.textShowcase}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonContainerLogout}
                onPress={() => {}}>
                <Text style={styles.textButton}>Message Engineer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SingleEngineer;

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
  specialist: {
    fontSize: 20,
    color: '#1abc4b',
    alignSelf: 'center',
    marginBottom: 10,
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
