import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'

export default class SettingScreen extends React.Component{
constructor(){
    super();
    this.state={
        firstName:'',
        lastName: '',
        emailId:'',
        address:'',
        contact:'',
        docId:''
    }
}
//update deatails of user to database
updateUserDetails=()=>{
    db.collection('Users').doc(this.state.docId)
    .update({
        "FirstName":this.state.firstName,
        "LastName":this.state.lastName,
        "Address": this.state.address,
        "Contact":this.state.contact
    })
    Alert.alert("Profile Successfully Updated")
}
//get the details of the user from database
getUserDetails=()=>{
var email=firebase.auth().currentUser.email;
db.collection("Users").where('EmailID','==',email).get()
.then(snapshot =>{
    snapshot.forEach(doc =>{
    var data=doc.data()
    thistory.this.setState({
        firstName:data.FirstName,
        lastName:data.LastName,
        emailId:data.EmailID,
        address:data.Address,
        contact:data.Contact,
        docId:doc.id
    })
    })
})


}
componentDidMount(){
this.getUserDetails();
}
    
    render(){
        return(
            <View style={styles.container} >
            <MyHeader title="Settings" navigation={this.props.navigation}/>
            <View style={styles.formContainer}>
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"First Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}
                  value ={this.state.firstName}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Last Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}
                  value ={this.state.lastName}
                />
                <TextInput
              style={styles.formTextInput}
              placeholder ={"Contact"}
              maxLength ={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                this.setState({
                  contact: text
                })
              }}
                value ={this.state.contact}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder ={"Address"}
              multiline = {true}
              onChangeText={(text)=>{
                this.setState({
                  address: text
                })
              }}
                value ={this.state.address}
            />
            <TouchableOpacity style={styles.button} onPress={()=>{
                thistory.updateUserDetails()
            }}>
                <Text style={styles.buttonText}>Save</Text>


            </TouchableOpacity>
            </View>
            </View>


        )
    }
}
const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })