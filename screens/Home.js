import React from 'react';
import {Component} from 'react'

import { StyleSheet,  View,TextInput,Image,FlatList, Alert, ActivityIndicator,Platform,TouchableOpacity} from 'react-native';
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
      refreshing: false,
      this.state =
      {
          isLoading: true,
          JSON_from_server: [],
          fetching_Status: false,

          position: 1,
          interval: null,
          dataSource: [
            {
              title: 'Title 1',
              caption: 'Caption 1',
              url: 'http://inyarwanda.com/app/webroot/img/201904/images/ubusitani-bwurwibutso-1-copy-219701554728185.jpg',
            }, {
              title: 'Title 2',
              caption: 'Caption 2',
              url: 'http://placeimg.com/640/480/any',
            }, {
              title: 'Title 3',
              caption: 'Caption 3',
              url: 'http://placeimg.com/640/480/any',
            },
          ]
      }
 
      this.page = 0
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }
 
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
 
  
  
  componentDidMount()
  {
      this.page = this.page + 1;
 
      fetch('http://somen.pe.hu/mobileApp/diplay.php')
      .then((response) => response.json())
      .then((responseJson) =>
      {
          this.setState({ JSON_from_server: [ ...this.state.JSON_from_server, ...responseJson ], isLoading: false });
      })
      .catch((error) =>
      {
          console.error(error);
      });
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
      });
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
      <Container>
<Header style={{backgroundColor:'#F2F2F2',height:90}}>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.navigate('ProfileScreen')}>
              <Icon  style={{color:'black',paddingTop:20}} name='menu' />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'black',paddingTop:20}}>InyaRwanda</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon  style={{color:'black',paddingTop:20}} name='refresh' />
            </Button>
          </Right>
        </Header>
        
 
   

            <Content>
            <View>
     
            <Slideshow 
        dataSource={this.state.dataSource}
        position={this.state.position}
        onPositionChanged={position => this.setState({ position })} />

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
                
                <List style={{paddingTop:5,marginEnd:0}}>
            <ListItem thumbnail>
              <Left>
                <Image source={{uri: item.image}} style={{width:90,height:120}}  />
              </Left>
              <Body>
              <Text numberOfLines={5} onPress={this.GetGridViewItem.bind(this, item.post_id)} style={{fontFamily:'',color:'#1A1A1A', fontSize:15,letterSpacing:0.5}} > 
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