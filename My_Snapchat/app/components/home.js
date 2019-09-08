import React from 'react';
import { FlatList, AsyncStorage ,Image, ImageBackground, StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import { Camera, Permissions } from 'expo'; 

class CameraHome extends React.Component {
    camera = null;

    state = {
        hasCameraPermission: null,
        cameraType : 'back',
        mirrorMode : false,
        uri: undefined,
        data: undefined,
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const hasCameraPermission = (camera.status === 'granted');
        this.setState({ hasCameraPermission });
    };

    revertCam() {
        if (this.state.cameraType === 'back') {
            this.setState({
              cameraType: 'front',
              mirror: true
            });
          } else {
            this.setState({
              cameraType: 'back',
              mirror: false
            });
          }
    }

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    takeSnap = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync({base64:true});
          this.setState({ uri: photo.base64})
        }
    };
      
    showList() {
        var token = AsyncStorage.getItem('userToken');
        fetch("https://api.snapchat.wac.epitech.eu/all", {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json', "token": token })
        }).then(res => res.json())
        .then((jsonData) => {
            this.setState({data: jsonData.data});
        })
    }

    basicViews() {
        this.setState({uri: undefined});
    }

    render() {
        // this.clearAsyncStorage();
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text> Camera Access Denied. </Text>;
        }
        if(this.state.data) {
            return(
                <View style={styles.list}>
                    <FlatList data={ this.state.data } renderItem={({item}) => 
                    <Text style={styles.listItem}> {item.email} </Text>}
                    keyExtractor={(item, index) => index.toString()} />
                </View>
            );
        }
        if (this.state.uri) {
            return (
                <View>
                    <ImageBackground style={styles.prevSnap} source={{ uri:'data:image/png;base64,'+ this.state.uri}}>
                        <TouchableHighlight style={styles.send} onPress={() => this.showList()}>
                            <Image style={styles.send} source={require('../../assets/send.png')} />
                        </TouchableHighlight>
                        <View style={styles.circleContainer}>
                            <TouchableHighlight style={styles.delete} onPress={() => this.basicViews()}>
                                <Image style={styles.delete} source={require('../../assets/x.png')} />
                            </TouchableHighlight>
                        </View>
                    </ImageBackground> 
                </View>
            );
        }

        return (
            <View>
                <Camera ratio={'16:9'} type={this.state.cameraType} mirrorImage={this.state.mirrorMode} 
                style={styles.preview} ref={camera => this.camera = camera} />
                <TouchableHighlight onPress={() => this.revertCam()}>
                    <Image style={styles.camera} source={require('../../assets/cam.png')} />
                </TouchableHighlight>
                <View style={styles.circleContainer}>
                    <TouchableHighlight style={styles.circle} onPress={() => this.takeSnap()}>
                        <Image style={styles.circle} source={require('../../assets/circle.png')} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    };
};

export default ({ history }) => (
    <View style={styles.preview}>
        <CameraHome/>
    </View>
);

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
    title: {
        color:"#fff",
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginBottom: 30,
        fontSize:25,
    },

    list: {
        flex:1,
    },

    listItem: {
        backgroundColor:'#fff',
        padding:4,
        margin:0.1,
        borderRadius: 4,
        borderWidth: 0.9,
        borderColor: 'black',
        color:'lightblue',
        width:'85%',
        alignItems:'center',
        alignSelf:'center',
    },

    camera: {
        width:48,
        height:48,
        marginTop:45,
        marginLeft:20,
    },

    delete: {
        width:28,
        height:28,
        position:'absolute',
        bottom: -10,
    },

    send: {
        width:44,
        height:44,
        marginTop:25,
        marginLeft:10,
    },

    circleContainer: {
        flex: 1,
        alignSelf:'center',
        alignItems:'center', 
        position:'absolute',
        height:winHeight,
    },

    circle: {
        width: 85,
        height: 85,
        position:'absolute',
        bottom: -10,
    },

    prevSnap: {
        height: winHeight + 30,
        width: winWidth,
        position: 'absolute',
    },

    preview: {
        height: winHeight + 30,
        width: winWidth,
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
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