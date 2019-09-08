import React from 'react';
import { Image, TextInput, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Redirect } from "react-router-native";

class Set extends React.Component{
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errorEmail: false,
            errorPassword: false,
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

    submit() {
        if(this.checkInfos()) {
            fetch("https://api.snapchat.wac.epitech.eu/inscription", {
                method: 'POST',
                body:JSON.stringify({"email": this.state.email, "password": this.state.password}),
                headers: new Headers({ 'Content-Type': 'application/json'})
            }).then(res => res.json())
            .then((jsonData) => {
                if(jsonData.data === "User Already Exists.") {
                    console.warn(jsonData);
                } else {
                    <View>
                        <Route exact path="/" component={Login} />
                        <Redirect to="/" />
                    </View>
                }
            })
            .catch(error => {
                console.warn("error : ", error)
            })
        }
    }

    render() {
        return (
            <View>
                <View style={{ justifyContent:"center", alignItems:"center"}}>
                    <Image style={styles.img} source={require('../../assets/logo.png')}/>
                </View>
                <Text style={styles.title}> Register </Text>
                <TextInput onChangeText={(text)=>this.setState({email: text})} placeholder="Email" 
                    style={[styles.input, this.state.errorEmail? styles.error:null]} />
                <TextInput secureTextEntry={true} onChangeText={(text)=>this.setState({password: text})} placeholder="Password" 
                    style={[styles.input, this.state.errorPassword? styles.error:null]}/>
                <Button title="REGISTER" onPress={()=>this.submit()}/>
            </View>
        );
    }
}

export default ({ history }) => (
    <View>
        <Set/>
        <TouchableOpacity onPress={() => history.push("/")}>
            <Text style={styles.link}> Already got an account ? Sign-In ! </Text>
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