import React, {Component} from 'react';
import {
  Container,
  Header,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Input,
  Item,
  Text,
  Picker,
} from 'native-base';
import {
  StyleSheet,
  Alert,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ListCards from '../../components/Lists';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchDataCompanies} from '../../public/redux/action/companies';

class HeaderMultipleIconExample extends Component {
  constructor() {
    super();
    this.state = {
      showSearch: false,
    };
    this.search = _.debounce(this.search, 1000);
  }

  componentDidMount() {
    this.props.fetch('', 'name', 'asc', 1, 5);
  }

  search = async search => {
    const {pages} = this.props;
    try {
      await this.props.fetch(search, pages.sort, pages.order, 1, pages.limit);
    } catch (err) {
      return Alert.alert(
        'Error',
        'Error connecting to the server, please try again later',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    }
  };

  sort = async sort => {
    const {pages} = this.props;
    try {
      await this.props.fetch(pages.search, sort, pages.order, 1, pages.limit);
    } catch (err) {
      return Alert.alert(
        'Error',
        'Error connecting to the server, please try again later',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    }
  };

  order = async order => {
    const {pages} = this.props;
    try {
      await this.props.fetch(pages.search, pages.sort, order, 1, pages.limit);
    } catch (err) {
      return Alert.alert(
        'Error',
        'Error connecting to the server, please try again later',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    }
  };

  limit = async limit => {
    const {pages} = this.props;
    try {
      await this.props.fetch(pages.search, pages.sort, pages.order, 1, limit);
    } catch (err) {
      return Alert.alert(
        'Error',
        'Error connecting to the server, please try again later',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    }
  };

  render() {
    const {showSearch} = this.state;
    const {isLoading, isError, companies, pages} = this.props;
    return (
      <Container>
        {showSearch && (
          <>
            <Header style={styles.header} searchBar rounded>
              <Item>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({showSearch: false});
                  }}>
                  <Icon name="ios-arrow-back" />
                </TouchableOpacity>

                <Input
                  placeholder="Search"
                  returnKeyType="search"
                  onChangeText={text => {
                    this.search(text);
                  }}
                />
                <Icon name="ios-search" />
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Header>
            <View style={styles.row}>
              <Picker
                mode="dropdown"
                selectedValue={pages.sort}
                onValueChange={(value, index) => {
                  this.sort(value);
                }}>
                <Picker.Item label="Name" value="name" />
                <Picker.Item label="Date updated" value="date_updated" />
              </Picker>
              <Picker
                mode="dropdown"
                selectedValue={pages.order}
                onValueChange={(value, index) => {
                  this.order(value);
                }}>
                <Picker.Item label="ASC[A-Z]" value="asc" />
                <Picker.Item label="DESC[Z-A]" value="desc" />
              </Picker>
              <Input
                placeholder="Limit"
                returnKeyType="go"
                keyboardType="number-pad"
                onChangeText={value => {
                  this.limit(value);
                }}
              />
            </View>
          </>
        )}

        {!showSearch && (
          <Header style={styles.header} searchBar rounded>
            <Body>
              <Title>Companies</Title>
            </Body>
            <Right>
              <Button transparent>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({showSearch: true});
                  }}>
                  <Icon name="search" />
                </TouchableOpacity>
              </Button>
              <Button transparent>
                <Icon name="more" />
              </Button>
            </Right>
          </Header>
        )}

        <View style={styles.seriesContainer}>
          {isLoading ? (
            <ActivityIndicator color="#DEAA9B" size="large" />
          ) : isError ? (
            <Text style={styles.text}>Error, please try again</Text>
          ) : companies.length < 1 ? (
            <Text style={styles.text}>
              No Companies found with keyword "{pages.search}", please try
              another keyword
            </Text>
          ) : (
            <FlatList
              style={styles.flatList}
              data={companies}
              renderItem={({item}) => <ListCards item={item} />}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1ABC9C',
  },
  seriesContainer: {
    // marginTop: 10,
  },
  text: {
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flatList: {marginBottom: 50},
});

const mapStateToProps = state => ({
  companies: state.companies.items,
  pages: state.companies.pages,
  isLoading: state.companies.isLoading,
  isError: state.companies.isError,
});

const mapDispatchToProps = dispatch => ({
  fetch: (search, sort, order, page, limit) =>
    dispatch(fetchDataCompanies(search, sort, order, page, limit)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderMultipleIconExample);
