import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'New Account',


  };
  constructor(props) {
 
    super(props)

       this.state = {
           
            user: '',
            pass: ''


                 }
         }
         storeData = async () => {
          const { user }  = this.state ;
          try {
            await AsyncStorage.setItem('user', user);
          } catch (error) {
            // Error saving data
          }
        };  
create = () =>{



const { user }  = this.state ;
const { pass }  = this.state ;


fetch('http://somen.pe.hu/mobileApp/Register.php', {
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify({

username: user,
password: pass

})

}).then((response) => response.json())
  .then((responseJson) => {

   if(responseJson === 1)
    {
        this.storeData();
        this.props.navigation.navigate('HomeScreen', { username: user });

    }
    else{

      Alert.alert(responseJson);
    }

  }).catch((error) => {
    console.error(error);
  });


}

  
     
  render() {
    return (
<Container>
                <Content>
                <View style={styles.container}>
               

                <Text>Username:</Text>
                
                <TextInput placeholder="Enter Username" onChangeText={user => this.setState({user})} style={styles.TextInputStyle}/>
                
                <Text>Password:</Text>
                
                <TextInput placeholder="Enter User Password" onChangeText={pass => this.setState({pass})} style={styles.TextInputStyle} secureTextEntry={true}/>
                
                <Button light block style={{aligSelf:'center'}}  onPress={this.create}><Text>Create</Text></Button>
                
                <Text style={{paddingTop:50}}>Already have Account?  <Text onPress={()=>this.props.navigation.navigate('LoginScreen')} style={{color:'#0054FF'}}>Login</Text></Text>
 
 </View>
                </Content>
            </Container>
    );
  }
}
export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50
  },
  TextInputStyle: {
 
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    width:300,
    borderWidth: 0,
    borderColor:'black',
    backgroundColor:'#E1E1E1',
    color:'black',
    
   
     
    },
     
     TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});
