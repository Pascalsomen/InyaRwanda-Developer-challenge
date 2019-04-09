import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator } from 'react-native';
import {AsyncStorage} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login to Contunie',
    headerLeft: null


  };
  
     constructor(props) {
 
               super(props)
 
                  this.state = {
 
                       user: '',
                       pass: ''
   
 
                            }
                    }
                  

                    check  = async () => {
                        try {
                          const value = await AsyncStorage.getItem('user');
                          if (value !== null) {
                            
                            //Alert.alert(value);
                          }else{
                            Alert.alert('no');
                          }
                        } catch (error) {
                          // Error retrieving data
                        }
                      };  
                      storeData = async () => {
                        const { user }  = this.state ;
                        try {
                          await AsyncStorage.setItem('user', user);
                        } catch (error) {
                          // Error saving data
                        }
                      };       
    Login = () =>{
        
 
        const { user }  = this.state ;
        const { pass }  = this.state ;
        if (this.state.user.trim() != "" && this.state.pass.trim() != "") {


          fetch('http://somen.pe.hu/mobileApp/Login.php', {
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
           
           
        
        } else {
        
          this.setState(() => ({ nameError: "username or password can not be empty!" }));
        }
        
      
         }
 
  
  render() {
    if (this.state.loading) {
        return (
   
              <View style={styles.ActivityIndicator_Style}>
   
              <ActivityIndicator size="large" />
   
              </View>
        );
      }
    return (
<Container>
                <Content>
                <View style={styles.container}>
                <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                  <Text>Username:</Text>
                  
                  <TextInput placeholder="Enter User Username" onChangeText={user => this.setState({user})} style={styles.TextInputStyle}/>
                  
                  <Text>Password:</Text>
                  
                  <TextInput placeholder="Enter User Password" onChangeText={pass => this.setState({pass})} style={styles.TextInputStyle} secureTextEntry={true}/>
                  
                  <Button light block style={{aligSelf:'center'}}  onPress={this.Login}><Text>Login</Text></Button>
                 
                  <Text style={{color:'#720000',paddingTop:20}}>Forgot Password ?</Text>
                  
                  <Text style={{paddingTop:50}}>Not have Account?  <Text onPress={()=>this.props.navigation.navigate('Register')} style={{color:'#0054FF'}}>Create Account</Text></Text>
                </View>
                </Content>
            </Container>
    );
  }
}
export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60
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
