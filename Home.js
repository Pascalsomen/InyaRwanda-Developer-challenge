import React from 'react';
import {Component} from 'react'

import { StyleSheet,  View,TextInput,Image,FlatList, Alert,Dimensions, ActivityIndicator,Platform,TouchableOpacity,ScrollView} from 'react-native';
import { Container, Content, List,Right,Grid,Col,Card,CardItem, ListItem,Title, Thumbnail,Left,Body, Input, Icon, Header,Text, Picker, Button } from 'native-base';
import Slideshow from 'react-native-image-slider-show';
class HomeScreen extends Component {
  static navigationOptions = {
    title: 'HomePage',
    header:null
  };
  constructor()
  {
      super();
     
      this.state =
      {
          isLoading: true,
          JSON_from_server: [],
          fetching_Status: false,
          position: 1,
       
          uniqueValue: 1
          
      }
      
 
      this.page = 0
  }
  

  forceRemount = () => {
    this.setState(({ uniqueValue }) => ({
      uniqueValue: uniqueValue + 1,
    }))
  }
 
  
  
 


  componentDidMount()
  {
      this.page = this.page + 1;
 
      fetch('http://somen.pe.hu/mobileApp/pagination.php?page=' + this.page)
      .then((response) => response.json())
      .then((responseJson) =>
      {
          this.setState({ JSON_from_server: [ ...this.state.JSON_from_server, ...responseJson ], isLoading: false });
      })
      .catch((error) =>
      {
          console.error(error);
      }),
      fetch('http://somen.pe.hu/mobileApp/display.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      })
        

  }
 
  fetch_more_data_from_server =()=>
  {        
      this.page = this.page + 1;
 
      this.setState({ fetching_Status: true }, () =>
      {
              fetch('http://somen.pe.hu/mobileApp/pagination.php?page=' + this.page)
              .then((response) => response.json())
              .then((responseJson) =>
              {
                  this.setState({ JSON_from_server: [ ...this.state.JSON_from_server, ...responseJson ], fetching_Status: false });
              })
              .catch((error) =>
              {
                  console.error(error);
              });
         
      });
  }
  FlatListItemSeparator =()=> {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
  Render_Footer=()=>
  {
    return (
        <View style = { styles.footerStyle }>
 
            <TouchableOpacity 
                activeOpacity = { 0.7 } 
                style = { styles.TouchableOpacity_style }
                onPress = { this.fetch_more_data_from_server } 
                >
 
                <Text>Read More ..</Text>
                
                {
                    ( this.state.fetching_Status )
                    ?
                        <ActivityIndicator color = "#3A8DFF" style = {{ marginLeft: 6 }} />
                    :
                        null
                }
 
            </TouchableOpacity> 
 
        </View>
    )
  }
  
  GetGridViewItem (post_id) {
   
    //Alert.alert(s_title);
    this.props.navigation.navigate('Details', { Story: post_id});
   
    }
    
  
    
    
  render()
  {
   
    
    return(
      <Container key={this.state.uniqueValue}>
<Header style={{backgroundColor:'white',height:90}}>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.navigate('ProfileScreen')}>
              <Icon  style={{color:'black',paddingTop:20}} name='menu' />
            </Button>
          </Left>
          <Body>
          <View flexDirection='row'>
          <Image source={{uri: 'https://yt3.ggpht.com/a-/AAuE7mCIp5F6d6PRUKCJBdCP82FBBwGlTKLpcZd-ug=s900-mo-c-c0xffffffff-rj-k-no'}} style={{width:25,height:25,marginTop:20}}  />
            <Title style={{color:'black',paddingTop:20,  paddingLeft:5}}> InyaRwanda</Title>
            </View>
          </Body>
          <Right>
            <Button transparent onPress={this.forceRemount}>
              <Icon  style={{color:'black',paddingTop:20}} name='refresh' />
            </Button>
          </Right>
        </Header>
        
 
   

            <Content>
            <View>
     <View>
            <FlatList  horizontal={true}
            scrollIndicator={false}
            data={ this.state.dataSource }
            renderItem={({item}) =>     
    
         
            
             
              
          <Card>
            <CardItem cardBody>
              <Image source={{uri:item.image}} style={{height: 150, width: 290, flex: 1}}/>
            </CardItem>
            <CardItem style={{backgroundColor:'#0F0F0F'}}>
             <Left/><Body>
               <Text onPress={this.GetGridViewItem.bind(this, item.post_id)} numberOfLines={3} style={{width:250,fontSize:14,color:'white'}}>{item.title}</Text>
             </Body><Right/>
            </CardItem>
          </Card>
            
    
            }
            keyExtractor={(item, index) => index}
            numColumns={1}
    />
</View>
      <View style = { styles.MainContainer }>
      {
        ( this.state.isLoading )
        ?
          ( <ActivityIndicator size = "large" /> )
        :
          (
              <FlatList
              
                style={{width: '100%'}}

                keyExtractor = {( item, index ) => index }

                data = { this.state.JSON_from_server }

                

                renderItem = {({ item, index }) => 
                
                <List>
            <ListItem thumbnail>
              <Left>
                <Image source={{uri: item.image}} style={{width:80,height:120}}  />
              </Left>
              <Body>
              <Text numberOfLines={5} onPress={this.GetGridViewItem.bind(this, item.post_id)} style={{fontFamily:'',color:'#1A1A1A', fontSize:14,letterSpacing:0.5}} > 
               {item.value} 
                </Text>
                <Text note numberOfLines={1}>{item.created_at}</Text>
              </Body>
            </ListItem>
          </List>
                }

                ListFooterComponent = { this.Render_Footer }
              />
          )
      }    

      </View>
      </View>  
 </Content>
</Container>
    );
  }}
  export default HomeScreen
  const styles = StyleSheet.create(
    {
      MainContainer:
      {
        flex: 1,
        justifyContent: 'center',
        margin: 5,
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
      },
     
      footerStyle:
      {
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
     
      TouchableOpacity_style:
      {
        padding: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color:'black'
        
      },
     
      TouchableOpacity_Inside_Text:
      {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18
      },
     
      flatList_items:
      {
        fontSize: 15,
        color: '#000',
        padding: 10
      }
    });