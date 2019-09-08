import React, { Component } from 'react';
import { View, Text, StyleSheet, Slider } from 'react-native';

class BottomNav extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Slider
                    width="100%"
                    minimumTrackTintColor="#4ccf59"
                    thumbTintColor="#4ccf59"
                    minimumValue={500} 
                    maximumValue={3000}
                    onValueChange={(val) => {this.props.updateFunction(val)}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position:"absolute",
        bottom:0,
        height:55,
        width:"100%",
        backgroundColor:"white",
        elevation:3,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        borderBottomColor:"#4ccf59",
        borderBottomWidth: 0.3,
    },
});

export default BottomNav;