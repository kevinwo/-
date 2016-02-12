/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;

class GoodBadRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
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
      <FBSDKLoginButton
          style={styles.loginButton}
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Error logging in.');
            } else {
              if (result.isCancelled) {
                alert('Login cancelled.');
              } else {
                alert('Logged in.');
              }
            }
          }}
          onLogoutFinished={() => alert('Logged out.')}
          readPermissions={[]}
          publishPermissions={['publish_actions']}
      />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  loginButton: {
    alignSelf: 'center',
    width: 200,
    height: 44,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  year: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  }
});

AppRegistry.registerComponent('GoodBadRestaurant', () => GoodBadRestaurant);
