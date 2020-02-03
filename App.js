import React,{Component, Fragment, useState} from 'react';
import {AppRegistry,StyleSheet, Text, View,Image,FlatList} from 'react-native';
import MapView from 'react-native-maps';
import DriversList from './Components/DriversList';

const vehicles=[ 
  {type:'car',key:'1'},
  {type:'bike',key:'2'},
  {type:'auto',key:'3'}];

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      latitude:null,
      longitude:null,
      error:null,
       isLoading:true,
     dataSource:[]
    };

  

  //   this.drivers={
  //     markers:[{
  //       key:'1',
  //       coordinates:{
  //         latitude:20.3406197,
  //         longitude:85.8179029,
  //         error:null
  //       }
  //     },{
  //       key:'2',
  //       coordinates:{
  //         latitude:20.3563306,
  //         longitude:85.8034088,
  //         error:null
  //       }
  //     }]
  // };

  }

  componentDidMount(){
   navigator.geolocation.getCurrentPosition(position=>{
     this.setState({
       latitude:position.coords.latitude,
       longitude:position.coords.longitude,
       error:null
     });
   },error =>this.setState({error:error.message}),
   {enableHighAccuracy:true ,timeout: 20000,maximumAge:2000}

   );

   while(true){
     if(!this.state.latitude){
       fetch('http://bharatorigins.in/kiwidev/api/user.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_lat:this.state.latitude,
          user_lng:this.state.longitude
        })
      })
       .then((response)=>response.json())
       .then((responseJson)=>{
         this.setState({
           isLoading:false,
           dataSource:responseJson
         })
    
       })
       .catch((error)=>{
         console.log(error)
       })
        break;
     }
   }

  }

  render() {

    if(!this.state.latitude){
      return <View><Text>Loading...</Text></View>
    }
    return (
      
      <View style={styles.container}>
      <MapView style={{...StyleSheet.absoluteFillObject}}
        region={{
          latitude:this.state.latitude,
          longitude:this.state.longitude,
          latitudeDelta:0.001,
          longitudeDelta:0.001
        }}
      >
    <MapView.Marker
        coordinate={this.state}
        pinColor="red"/> 

 {this.state.dataSource.map(marker=>(
         <MapView.Marker
         coordinate={{
           key:marker.id,
           latitude:Number(marker.dr_lat),
           longitude:Number(marker.dr_lng)
          }}
        >
          {console.log(marker.dr_lat)}
          <Image source={require('./assets/cartop.jpg') }
       style={{height:50,width:50}}/>
       
         </MapView.Marker>
    ))}

 

{/* {this.drivers.markers.map(marker=>(
         <MapView.Marker
         coordinate={marker.coordinates}
        >
          <Image source={require('./assets/cartop.jpg') }
       style={{height:50,width:50}}/>
       
         </MapView.Marker>
    ))}  */}

<FlatList
    keyExtractor={(item)=>{item.key}}
    data={vehicles}
    renderItem={({item})=>{
<Text>{item.type}</Text>
console.log(item.type);
    }}/> 
      </MapView>


    


</View>
  

      
    );
  }
}

AppRegistry.registerComponent("app",()=>App);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
