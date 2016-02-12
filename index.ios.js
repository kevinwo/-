/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

class RestaurantSearch extends Component {
  render() {
    return (
      <Text style={styles.text}>Heyo</Text>
    )
  }
}

class GoodBadRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: false,
    };
  }

  componentDidMount() {
    // this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '好不好餐廳',
          component: RestaurantSearch,
        }} />
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 30,
    margin: 80,
  }
});

AppRegistry.registerComponent('GoodBadRestaurant', () => GoodBadRestaurant);
