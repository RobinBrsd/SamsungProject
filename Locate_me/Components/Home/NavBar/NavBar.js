import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

class NavBar extends Component {

    logout = () => {        
        axios.get("https://locatemeapi.herokuapp.com/logout/" + this.props.id)
            .then(response =>  Actions.login());
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rightNav}>
                    <Icon color="#4ccf59" size={23} name="pin-drop"/>
                    <Text style={styles.title}> LOCATE ME  </Text>
                </View>
        
                <View style={styles.rightNav}>
                    <TouchableOpacity style={styles.navItem}>
                        <Icon size={26} name="account-circle" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={this.logout}>
                        <Icon size={26} name="exit-to-app" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:28,
        height:55,
        backgroundColor:"white",
        elevation:3,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
    },

    title: {
        fontSize:18,
        fontWeight:"bold",
    },

    rightNav: {
        flexDirection:"row",
        alignItems:"center",
    },

    navItem: {
        marginLeft:10,
    }
});

export default NavBar;