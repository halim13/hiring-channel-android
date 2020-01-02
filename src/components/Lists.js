import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {List, Thumbnail, Left, Body, ListItem, Right} from 'native-base';
import _ from 'lodash';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const Lists = props => {
  const {item, navigation} = props;
  console.log(navigation.navigate);
  return (
    <List>
      <ListItem
        style={styles.listItem}
        thumbnail
        onPress={() => {
          // here we navigate and pass props the components got it
          navigation.navigate('SingleCompany', {
            id: item.id,
            image: item.logo ? item.logo : undefined,
            name: item.name,
            description: item.description,
            location: item.location,
            no_contact: item.no_contact,
            email: item.email,
            allProps: item,
          });
        }}>
        <Left>
          <Thumbnail square source={{uri: item.logo ? item.logo : ''}} />
        </Left>
        <Body style={styles.body}>
          <Text style={styles.text}>{item.name}</Text>
          <Text note numberOfLines={1}>
            {item.description}
          </Text>
        </Body>
        <Right style={styles.right}>
          <Icon name="arrow-right" size={17} style={styles.text} />
        </Right>
      </ListItem>
    </List>
  );
};

export default withNavigation(Lists);

const styles = StyleSheet.create({
  body: {
    marginRight: 20,
    borderBottomColor: 'rgba(0,0,0,0)',
  },
  text: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 5,
  },
  right: {
    borderBottomColor: 'rgba(0,0,0,0)',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
});
