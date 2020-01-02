import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Thumbnail, Left, Body, ListItem} from 'native-base';

import {withNavigation} from 'react-navigation';

const CardList = props => {
  const {item, navigation} = props;
  const clearSum =
    item && item.summary
      ? item.summary
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim()
      : '';

  return (
    <ListItem
      thumbnail
      onPress={() => {
        // here we navigate and pass props the components got it
        navigation.navigate('SingleSeries', {
          seriesID: item.id,
          image: item.logo ? item.logo : undefined,
          title: item.name,
          summary: item.summary,
          allProps: item,
        });
      }}>
      <Left>
        <Thumbnail
          square
          source={{
            uri: item.logo
              ? item.logo
              : 'https://via.placeholder.com/210x295.png?text=No+Image',
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Text style={styles.title}>{item.name}</Text>
        <Text note numberOfLines={1}>
          {clearSum ? clearSum : ''}
        </Text>
      </Body>
    </ListItem>
  );
};

export default withNavigation(CardList);

const styles = StyleSheet.create({
  body: {marginRight: 20},
  title: {fontWeight: '600', fontSize: 17, marginBottom: 5},
});
