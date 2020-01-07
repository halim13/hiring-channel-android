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
  RefreshControl,
} from 'react-native';
import ListCardsEngineers from '../../components/ListsEngineers';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchData, loadMore} from '../../public/redux/action/engineers';

class Engineers extends Component {
  constructor() {
    super();
    this.state = {
      showSearch: false,
      loadData: false,
      isFetching: false,
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
  nextPage = async () => {
    const {pages} = this.props;
    const next = parseInt(pages.page, 10) + 1;
    try {
      await this.props.fetch(
        pages.search,
        pages.sort,
        pages.order,
        next,
        pages.limit,
      );
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

  onRefresh() {
    this.setState({isFetching: true}, async () => {
      await this.props.fetch(
        this.props.pages.search,
        this.props.pages.sort,
        this.props.pages.order,
        1,
        this.props.pages.limit,
      );
      this.setState({isFetching: false});
    });
  }
  renderFooter() {
    return (
      <View style={styles.footer}>
        {parseInt(this.props.pages.page, 10) !==
        parseInt(this.props.pages.totalPage, 10) ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.loadMoreData}
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Load More</Text>
            {this.state.loadData ? (
              <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  }
  loadMoreData = async () => {
    const {pages} = this.props;
    const page =
      pages.page === pages.totalPage
        ? pages.totalPage
        : parseInt(pages.page, 10) + 1;
    this.setState({loadData: true});
    await this.props.loadMore(
      pages.search,
      pages.sort,
      pages.order,
      page,
      pages.limit,
    );
    this.setState({loadData: false});
  };

  render() {
    const {showSearch, isFetching} = this.state;
    const {isLoading, isError, engineers, pages} = this.props;
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
                defaultValue={this.props.pages.limit}
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
              <Title>Engineers</Title>
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
          {isLoading && isFetching ? (
            <ActivityIndicator color="#DEAA9B" size="large" />
          ) : isError ? (
            <Text style={styles.text}>Error, please try again</Text>
          ) : engineers.length < 1 ? (
            <Text style={styles.text}>
              No Engineers found with keyword "{pages.search}", please try
              another keyword
            </Text>
          ) : (
            <FlatList
              style={
                this.state.showSearch
                  ? styles.flatListShowSearch
                  : styles.flatList
              }
              refreshControl={
                <RefreshControl
                  onRefresh={() => this.onRefresh()}
                  refreshing={this.state.isFetching}
                />
              }
              ListFooterComponent={this.renderFooter.bind(this)}
              data={engineers}
              renderItem={({item}) => <ListCardsEngineers item={item} />}
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
  load: {
    marginTop: 10,
    alignItems: 'center',
  },
  flatList: {marginBottom: 50},
  flatListShowSearch: {marginBottom: 100},
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  engineers: state.engineers.items,
  pages: state.engineers.pages,
  isLoading: state.engineers.isLoading,
  isLoadMore: state.engineers.isLoadMore,
  isError: state.engineers.isError,
});

const mapDispatchToProps = dispatch => ({
  fetch: (search, sort, order, page, limit) =>
    dispatch(fetchData(search, sort, order, page, limit)),
  loadMore: (search, sort, order, page, limit) =>
    dispatch(loadMore(search, sort, order, page, limit)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Engineers);
