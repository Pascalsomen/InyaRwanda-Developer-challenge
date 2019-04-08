import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Image ,FlatList,Alert,ActivityIndicator } from 'react-native';
import {AsyncStorage} from 'react-native';
import { Container, Content, List, ListItem,Left,Body, InputGroup, Input, Icon,Text, Picker, Button, Textarea, Item, Thumbnail } from 'native-base';
class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'My Profile',


  };

  checkUser  = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        
        this.setState({
          user: value
        })
    
      }else{
        this.props.navigation.navigate('LoginScreen');
      }
    } catch (error) {
      // Error retrieving data
    }
  }; 
  async logOut() {
    try {
      await AsyncStorage.removeItem('user');
      this.props.navigation.navigate('LoginScreen');
      return true;
    }
    catch(exception) {
      return false;
    }
  }
 
  constructor(props)
  {
 
    super(props);
    
    this.state = { 
    
        

        user: '',
        comment: ''
    
    }
 
  }

  componentDidMount() {
    
       return fetch('http://somen.pe.hu/mobileApp/selected.php',{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         post_id : this.state.Story
       })
     })
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             loading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         }),
         fetch('http://somen.pe.hu/mobileApp/com_selected.php',{
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         post_id : this.state.Story
       })
     })
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             loading: false,
             data: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         })   
    }
  
  render() {
    this.checkUser();
    const { navigation } = this.props;
  
    return (
     <Container style={styles.container}>
            <Content>
               
            <Thumbnail circular source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' }} style={{height:100,width:null}} />
              <Text style={{padding:10,fontSize:20}}>{this.state.user}</Text>
              <Button  onPress={this.logOut}light><Text>Sign Out</Text></Button>
            </Content>

            </Container>
    );
  }
}
export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50
  },
  TextInputStyleClass: {
 
    

    borderWidth: 1,
    borderColor:'black',
    color:'black',
    padding:10,
    borderColor:'#E1E1E1'
     
    },
     
     TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});
