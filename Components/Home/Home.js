import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar/NavBar';
import Map from './Map/Map';
import BottomNav from './BottomNav/BottomNav';

class Home extends Component {

    state = {
        id: this.props.id,
        radius:1000,
    }

    updateRadius = (val) => { this.setState({radius:val}); }

    render() {
        return (
            <Fragment>
                <NavBar id={this.props.id}/>
                <View style={styles.container}>
                    <Map data={this.props.data} radius={this.state.radius}/>
                </View>
                <BottomNav updateFunction={this.updateRadius}/>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Home;