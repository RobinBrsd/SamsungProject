import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { NativeRouter, Route, Switch, Redirect } from "react-router-native";

// Pages 
import Login from "./app/components/login";
import Register from "./app/components/register";
import Home from "./app/components/home";

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
            <IsLog />
        </View>
      </NativeRouter>
    );
  }
}

class IsLog extends React.Component{
  constructor() {
      super()
      this.state = {
          token: null,
      }
      if(this.state.token === null)
        this.get();
  }

  async get() {
    var token = await AsyncStorage.getItem('userToken');
    if(token != null)
      this.setState({token: token});
  }

  render() {
    if(this.state.token != null) {
      return (
        <Switch>
          <Route exact path="/home" component={Home} />
          <Redirect to="/home"/>
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Redirect to="/"/>
        </Switch>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffdb4d',
    justifyContent: 'center',
    paddingRight:60,
    paddingLeft:60,
  },
});
