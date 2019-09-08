import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class FicheUser extends Component {

    addContact = () => {
        console.warn("contact added");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.ficheStyle}>
                    <TouchableOpacity onPress={() => Actions.pop("fiche")}>
                        <Icon style={{margin:6, color:"#4ccf59"}} size={26} name="close" />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Icon style={{marginTop:20}}size={155} name="people" />
                        <Text style={{fontWeight:"bold", fontSize:25, marginTop:-25}}> Unknown </Text>
                        <Text style={{marginTop:35, fontSize:19}}> {this.props.phoneNumber} </Text>
                        <TouchableOpacity style={styles.btn} onPress={() => this.addContact(this.props.phoneNumber)}>
                            <Text style={{fontWeight:"bold",}}> Add to contact </Text>
                            <Icon style={{marginLeft:2}} size={20} name="person-add" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      position:"absolute",
      top: 0, left: 0, right: 0, bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center',
    },

    ficheStyle: {
        marginTop:30,
        height:"70%",  
        width:"90%",
        backgroundColor:"white",
        opacity:0.92,
        borderColor:"black",
        borderWidth:1,
    },

    content: {
        flex:1,
        alignItems: 'center',
    },

    btn: {
        borderColor:"black",
        backgroundColor:"#4ccf59",
        borderWidth:1,
        textAlign:"center",
        marginTop:25,
        padding:5,
        width:190,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
});

export default FicheUser;