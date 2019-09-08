import React from 'react';
import { Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import { NativeRouter, Route, Switch, Redirect } from "react-router-native";

import Home from "./home";
import Login from "./login";
import Register from "./register";

class Set extends React.Component{
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errorEmail: false,
            errorPassword: false,
            reload:false,
        }
    }

    checkInfos() {
        if(this.state.email === "" || this.state.email === " ") {
            this.setState({errorEmail: true});
        } else {
            this.setState({errorEmail: false});
        }

        if(this.state.password === "" || this.state.password === " ") {
            this.setState({errorPassword: true});
        } else {
            this.setState({errorPassword: false});
        }

        if(!this.state.errorEmail && !this.state.errorPassword)
            return true;
    }

    async submit() {
        if(this.checkInfos()) {
            const log = await fetch("https://api.snapchat.wac.epitech.eu/connection", {
                method: 'POST',
                body:JSON.stringify({"email": this.state.email, "password": this.state.password}),
                headers: new Headers({ 'Content-Type': 'application/json'})
            }).then(res => res.json())
            .then((jsonData) => {
                this.setState({reload:true});
                return jsonData;
            })
            .catch(error => {
                console.warn("error : ", error);
            })
            await AsyncStorage.setItem('userToken', log.data.token);
        }
    }

    render() {
        if(this.state.reload === true)  {
            return <IsLog/>;
        } else {
            return (
                <View>
                    <View style={{ justifyContent:"center", alignItems:"center"}}>
                        <Image style={styles.img} source={require('../../assets/logo.png')}/>
                    </View>
                    <Text style={styles.title}> Login </Text>
                    <TextInput onChangeText={(text)=>this.setState({email: text})} placeholder="Email" 
                        style={[styles.input, this.state.errorEmail? styles.error:null]} />
                    <TextInput secureTextEntry={true} onChangeText={(text)=>this.setState({password: text})} placeholder="Password" 
                        style={[styles.input, this.state.errorPassword? styles.error:null]}/>
                    <Button title="LOGIN" onPress={()=>this.submit()}/>
                </View>
            );
        }
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
      console.warn(token);
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

export default ({ history }) => (
    <View>
        <Set/>
        <TouchableOpacity onPress={() => history.push("/register")}>
            <Text style={styles.link}> No Account ? Sign-Up ! </Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    title: {
        color:"#fff",
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginBottom: 30,
        fontSize:25,
    },

    error: {
        borderColor:"red",
    },

    input: {
        height:37,
        borderColor:"lightblue",
        borderWidth:2,
        backgroundColor:"#fff",
        padding:10,
        flexGrow:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10,
    },

    img: {
        height:150,
        width:150,
        marginBottom:25,
        marginTop:0,
    },

    link: {
        marginTop:20,
        color:"gray",
        fontWeight:"bold",
    }
});