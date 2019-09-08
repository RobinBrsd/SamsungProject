import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import MapStyle from './mapStyle.json';
import axios from 'axios';

class Map extends Component {

    state  = {
        markers:[],
    }

    componentDidMount () {
        this.getAllMarker();
    }

    getAllMarker = () => {
        axios.get("https://locatemeapi.herokuapp.com/all")
            .then(response =>  this.setState({markers:response.data}));
    }

    generateMarker = (i, lat, lng, phoneNumber, color, text) => {
        var number = "+33" + phoneNumber.substr(1, phoneNumber.length);
        return ( 
            <MapView.Marker 
                onPress={() => {Actions.fiche({phoneNumber:number});}}
                key={i}
                pinColor={color}
                title={number}
                description={text}
                coordinate={{
                    latitude: lat,
                    longitude: lng,
                }}
            />
        )
    }

    render() {
        // console.log(this.props.data.lat);
        console.log(this.props.data);
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.container}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={MapStyle}
                    loadingEnabled = {true}
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    initialRegion={{
                        latitude: this.props.data.lat,
                        longitude:this.props.data.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                >
                { this.state.markers.map((obj, i) => {
                    if(obj.phoneNumber === this.props.phoneNumber) {
                       return this.generateMarker(i, obj.lat, obj.lng, obj.phoneNumber, "cyan", "You are here !");
                    } else {
                       return this.generateMarker(i, obj.lat, obj.lng, obj.phoneNumber, "#4ccf59", "Someone to meet !");
                    }        
                })}

                <MapView.Circle 
                    center={{
                        latitude:this.props.data.lat,
                        longitude:this.props.data.lng,
                    }}
                    radius={this.props.radius}
                    strokeWidth = {1}
                    strokeColor = "#4ccf59"
                    fillColor = { 'rgba(230,238,255,0.5)' }
                />
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%',
    },
});

export default Map;