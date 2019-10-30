/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Component,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native';

var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this);
    this.renderMovie = this.renderMovie.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList
            data={this.state.data}
            renderItem={this.renderMovie}
            style={{ backgroundColor: "#F5FCFF" }}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </>
    );
  }

  // fetchData() {
  //   fetch(REQUEST_URL)
  //     .then(response => response.json())
  //     .then(responseData => {
  //       // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
  //       this.setState({
  //         data: this.state.data.concat(responseData.movies),
  //         loaded: true
  //       });
  //     });
  // }

  async fetchData() {
    try {
      let response = await fetch(REQUEST_URL);
      let responseData = await response.json();
      this.setState({
        data: this.state.data.concat(responseData.movies),
        loaded: true
      });
    } catch (error) {
      console.error(error);
    }
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }

  onPressItem(item) {
    alert(item.title + ' clicked');
  }

  renderMovie({ item }) {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    return (
      <>
        <TouchableOpacity onPress={() => this.onPressItem(item)}>
          <View style={styles.container}>
            <Image
              source={{ uri: item.posters.thumbnail }}
              style={{ width: 53, height: 81 }}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.year}>{item.year}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.separator}></View>
      </>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  year: {
    textAlign: "center"
  },
  separator: {
    marginLeft: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
