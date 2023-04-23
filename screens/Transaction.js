import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextTnput, ImageBackground, Image } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImage = require("../assets/images/images/background2.png");
const appIcon = require("../assets/images/images/appIcon.png");
const appName = require("../assets/images/images/appName.png");

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId : "",
      studentId : "",
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const {domState}=this.state;

    if (domState==="bookId") {
    this.setState({
      bookId: data,
      domState: "normal",
      scanned: true
    });
  } else if(domState==="studentId") {
    this.setState({
      studentId: data,
      domState: "normal",
      scanned: true
    });
  }

  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState !== "normal") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground source = {bgImage} style = {styles.bgImage}> 
          <View style = {styles.upperContainer}>
            <Image source = {appIcon} style = {style.appIcon}/>
            <Image source = {appName} style = {style.appName} />
          </View> 
        <View style = {styles.lowerContainer}> 
            <View style = {styles.textInputContainer} > 
              <TextInput 
              style = {styles.textInput}
              placeholder = {"Book Id"}
              placeholderTextColor = {"#ffffff"}
              value = {bookId}
              /> 
              <TouchableOpacity style = {styles.scanButton}
              onPress = {()=>this.getCameraPermissions("bookId")}>
                <Text style = {styles.scanButtonText}> Scan </Text>
              </TouchableOpacity>
            </View>

            <View style = {[styles.textInputContainer, {marginTop : 25}]} > 
              <TextInput 
              style = {styles.textInput}
              placeholder = {"Student Id"}
              placeholderTextColor = {"#ffffff"}
              value = {studentId}
              /> 
              <TouchableOpacity style = {styles.scanButton}
                onPress = {()=>this.getCameraPermissions("studentId")}>
                <Text style = {styles.scanButtonText}> Scan </Text>
              </TouchableOpacity>
            </View>    
        </View>
      </ImageBackground>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  bgImage: {
    flex : 1,
    resizeMode : "cover",
    justifyContent : "center",
  },
  upperContainer : {
    flex : 0.5,
    justifyContent : "center",
    alignItems : "center"
  },
  appIcon : {
    width : 200,
    height : 200,
    resizeMode : "contain",
    marginTop : 80
  },
  appName : {
    width : 80,
    height : 80,
    resizeMode : "contain"
  },
  lowerContainer : {
    flex : 0.5,
    alignItems : "center",
  },
  textInputContainer : {
    borderWidth: 2,
    borderRadius : 10,
    flexDirection : "row",
    backgroundColor : "#9dfd24",
    borderColor : "white",
  },
  textInput : {
    width : "57%",
    height : 50,
    padding : 50,
    borderColor : "white",
    borderRadius : 10,
    borderWidth : 3,
    fontSize : 18,
    backgroundColor : "#5653d4",
    fontFamily : "Rajdhani_600SemiBold",
    color : "white"
  },
  scanButton : {
    width : 100,
    height : 50,
    backgroundColor : "#9dfd24",
    borderTopRightRadius : 10,
    borderBottomRightRadius : 10,
    justifyContent : "center",
    alignItems : "center"
  },
  scanButtonText : {
    fontSize : 24,
    color : "0a0101",
    fontFamily : "Rajdhani_600SemiBold"
  }
});
