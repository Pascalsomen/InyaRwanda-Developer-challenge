import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Image ,FlatList,Alert,ActivityIndicator } from 'react-native';
import {AsyncStorage} from 'react-native';
import { Container, Content, List, ListItem,Left,Body, InputGroup, Input, Icon,Text, Picker, Button, Textarea, Item, Thumbnail } from 'native-base';
class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Details',
    


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
  constructor(props)
  {
 
    super(props);
    
    this.state = { 
      
      Story: this.props.navigation.state.params.Story,
        loading: true,

        user: '',
        comment: ''
    
    }
 
  }
  comment = () =>{



    const { user }  = this.state ;
    const { comment }  = this.state ;
   
    const id = this.state.Story
    //Alert.alert(user)
    
    fetch('http://somen.pe.hu/mobileApp/comments.php', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    
    username: user,
    comment: comment,
    post_id:id
    
    })
    
    }).then((response) => response.json())
      .then((responseJson) => {
    
       if(responseJson === 1)
        {
    
            this.props.navigation.navigate('Details');
    
        }
        else{
    
          Alert.alert(responseJson);
        }
    
      }).catch((error) => {
        console.error(error);
      }); 
    
    
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
    const itemId = navigation.getParam('Story', 'Story');
    if (this.state.loading) {
      return (

            <View style={styles.container}>

            <ActivityIndicator size="large" />

            </View>
      );
    }
    return (

<Container>
                <Content>
               
              
              
                
            
                   <FlatList
            data={ this.state.dataSource }
            renderItem={({item}) =>        
<View>

<Image source={{uri:  item.image}} style={{height: 150, flex: 1}}/>
<Text style={{padding:10,fontSize:18,color:'#00658F',letterSpacing:0.5}}>  {item.title} </Text>
<Text style={{color:'#9FA1A2',fontSize:14,padding:10}} > 
Published {item.created_at}  By {item.names}</Text> 
<Text style={{padding:10,color:'#00214E',letterSpacing:1}}>{item.content}</Text>
 
</View>
            }
            keyExtractor={(item, index) => index}
            numColumns={1}
            />
            <Text style={{padding:10}}>Comment</Text>
<TextInput  style={{padding:10}}
  onChangeText={(user) => this.setState({ user })}
  value={this.state.user}
 editable={false}/>
<Textarea style={styles.TextInputStyleClass} onChangeText={comment => this.setState({comment})} rowSpan={4} placeholder="Say something...."> </Textarea>
<Button style={{margin:10}} light block><Text style={{color:'black'}} onPress={this.comment}>Send</Text></Button>
            

<FlatList
            data={ this.state.data }
            renderItem={({item}) =>        




<List>
            <ListItem thumbnail>
              <Left>
              <Thumbnail source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' }} />
              </Left>
              <Body>
              <Text style={{padding:5,fontSize:14,color:'#00658F',letterSpacing:1}}>  {item.username} </Text>
              <Text style={{color:'#9FA1A2',fontSize:12,paddingLeft:10,marginTop:2}} > 
{item.created_date}</Text> 
                <Text style={{paddingLeft:10,fontSize:13,marginTop:2,color:'#00214E',letterSpacing:1}}>{item.msg}</Text>
              </Body>
            </ListItem>
          </List>







 

            }
            keyExtractor={(item, index) => index}
            numColumns={1}
            />
                </Content>
            </Container>
    );
  }
}
export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60
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
