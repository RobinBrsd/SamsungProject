import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BG from './LoginBg.jpg';

class Login extends Component {

    state = { 
        text:"",
        location: null,
        color:"white",
    }

    componentDidMount = () => {
        this.findCoordinates();
    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
          position => { this.setState({ location:position }); },
          
          error => Alert.alert(error.message),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    checkNumber = () => {``
        var number = "+33" + this.state.text.substr(1, this.state.text.length);
        if(/^((\+)33|0)[1-9](\d{2}){4}$/g.test(number)){
            let data = {
                phoneNumber: number,
                lat: this.state.location.coords.latitude,
                lng : this.state.location.coords.longitude,
            }

            axios({
                method: 'post',
                url: 'https://locatemeapi.herokuapp.com/login',
                data: data
            }).then(function (response) {
                let id = response.data._id;
                Actions.home({id:id, data:data});
            }).catch((error) => {
                if(error){
                    console.log(error);
                    this.setState({color:"red"})
                } 
            });
        } else {
            console.warn("value wrong");
            this.setState({color:"red"});
        }
    }

    onFocus = () => {
        this.setState({ color: 'orange', backgroundColor:'black', width:"100%"})
    }



    render() {
        return (
            <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>

                <View style={styles.rightNav}>
                    <Icon color="white" size={32} name="pin-drop"/>
                    <Text style={styles.title}> Locate Me </Text>
                </View>
                <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
                    <TextInput
                        maxLength={10}
                        style={{
                            padding:5,
                            paddingLeft:10,
                            width: 290,
                            borderColor: this.state.color,
                            backgroundColor: this.state.backgroundColor,
                            color:"white",
                            borderWidth: 1,
                            marginBottom:3, 
                        }}
                        onFocus={this.onFocus}
                        onChangeText={(text) => this.setState({text})}
                        placeholder="Phone Number ..."
                        value={this.state.text}
                    />
               </KeyboardAvoidingView>
              
                <TouchableOpacity style={{width:"100%", alignItems: 'center', marginBottom:"20%"}} onPress={this.checkNumber}>
                    <Text style={styles.btn}> LOGIN </Text>
                </TouchableOpacity>
                
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      width:"100%",
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    rightNav: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:5,
        borderBottomColor:"orange",
        borderBottomWidth:1,
        borderBottomLeftRadius:200,
        borderBottomRightRadius:200,
        marginTop:80,
    },

    focus: {
        color:"blue",
    },

    btn: {
        color:"white",
        borderColor:"white",
        borderWidth:1,
        textAlign:"center",
        marginTop:10,
        padding:5,
        width:290,
    },

    title: {
        color:"white", 
        fontSize:34, 
        textAlign:"center",
        textTransform:"uppercase",
    },
});

export default Login;