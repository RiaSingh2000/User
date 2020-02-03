import React from 'react';
import axios from 'axios';
import MapView from 'react-native-maps';
import {AppRegistry,StyleSheet, Text, View,Image} from 'react-native';

export default class DriversList extends React.Component{
    state={
        drivers:[]
    }

    componentDidMount(){
        axios.get('http://bharatorigins.in/kiwidev/api/user.php')
        .then(res=>{
            console.log(res);
            this.setState({drivers:res.data});
        });
    }
// render(){
//     return(<View>
//         {this.state.dataSource.map(marker=>(
//             <MapView.Marker
//             coordinate={{
//               latitude:Number(marker.dr_lat),
//               longitude:Number(marker.dr_lng)
//             }}
//            >
//              <Image source={require('.././assets/cartop.jpg') }
//           style={{height:50,width:50}}/>
          
//             </MapView.Marker>
//        ))} 
//        </View>
//     )
// }
}