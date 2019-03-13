import {Location,Permissions,LinearGradient } from 'expo';
import { connect } from "react-redux";
import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Button,Dimensions,} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {signoutUser,mapLoaded} from '../src/actions';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { Ionicons } from '@expo/vector-icons';

 class RiderHome extends React.Component{
  signout_User = ()=>{
   // console.log("byeee")
    this.props.signoutUser();
    this.props.navigation.navigate('Auth');
  }
   static navigationOptions = ({navigation,state }) => {
     return{
      headerTitle:"Just Book Your Cab - JBYC",
      headerStyle: {height: 40},
      headerBackground: (
          <LinearGradient
            colors={['#5ED2A0', '#339CB1']}
            style={{ flex: 1 }}
            start={[0, 0]}
            end={[1, 0]}
          />
        ),
          headerRight: <Button title='Log Out ' onPress={()=>{const p = navigation.getParam('signoutuser');p()}} />
     };
   }
  
   async  componentDidMount(){
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log("permisson granted");
    
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    await this.setState({clat:Number(location.coords.latitude),clng:Number(location.coords.longitude)})
    this.props.navigation.setParams({ signoutuser: this.signout_User });
}
componentWillReceiveProps(nextProps){
  this.nav(nextProps);
 
}
nav = (props) =>{
  this.props.navigation.navigate('RiderHome')
}

   
constructor(props){
  super(props);
  this.state = {
    search:'',
    sourceLat:'',
    sourceLng:'',
    destLat:'',
    destLng:'',
    dataSource:[],
    type:'Source Address...',
    clat:0,
    clng:0,
    showMap:false,
    coords:[]
  }
}
   async SearchFilterFunction(text) {
    this.setState({
      search:text,
    });
  }
   ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };
  
  textPressed = async  (lat,lng,place) =>{
    //console.log(this.state)
    //console.log(lat + " "+ lng + " "+ place)
    if(this.state.type === 'Source Address...'){
     // console.log("HIIi");
    await this.setState({
      sourceLat:lat,
      sourceLng:lng,
      dataSource:[],
      search:'',
      type:'Destination Address...'
    })
  }
  else{
   // console.log("bye");
    await this.setState({
      destLat:lat,
      destLng:lng,
      dataSource:[],
      search:'',
      type:'Source Address...'
    })

    try {
      const startLoc = this.state.sourceLat+", "+this.state.sourceLng;
      const destinationLoc = this.state.destLat+", "+this.state.destLng;
      console.log(startLoc+" "+destinationLoc);
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=${'apikey'}&mode=${'driving'}`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        await this.setState({coords: coords,showMap:true})
       // console.log(this.state.dataSource)
       this.props.mapLoaded(true);
    } catch(error) {
        alert(error)
        
    }
  }
  //console.log(this.state)
  }
  
   onSubmit = async () =>{
    
     const mystr = this.state.search.replace(/ /g,'%20');
      let resp = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${mystr}&inputtype=textquery&fields=geometry,formatted_address&key={apikey}`)
      let respJson = await resp.json();
      const res = respJson.candidates.map((value,index)=>{
            const data = {
              place:value.formatted_address,
              lat:value.geometry.location.lat,
              lng:value.geometry.location.lng,
              key:index
            }
        return data;
      });
     
    await this.setState({dataSource:res});
  }
  onMapLayout = async () => {
    await this.setState({ showMap: true });
  }
   render(){
     return(
      <View style={styles.viewStyle}>
      <View style = {{flex:8}}>
        <SearchBar
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder={this.state.type}
          value={this.state.search}
          onSubmitEditing = {(text)=>this.onSubmit()}
          containerStyle ={{marginTop:0}}
          />
          <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <Text style={styles.textStyle} onPress = { () => {this.textPressed(item.lat,item.lng,item.place)}}>{item.place}</Text>
          )}
          enableEmptySections={true}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
         <View style = {{flex:20}}>
          <MapView style={styles.map} initialRegion={{
        latitude:this.state.clat, 
        longitude:this.state.clng, 
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      onLayout = {this.onMapLayout}
      showsScale
          showsCompass
          showsPointsOfInterest
          showsBuildings
      >
      { this.state.showMap &&
            <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
  
          }
      
      </MapView>
      <MapView.Callout>
    <View style={{}}>
      <Button title='Book Now!' onPress={()=> alert("Booking Confirmed")} />
    </View>
  </MapView.Callout>
      </View>
      
      </View>
    
     );
   }
 }

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor:'white',
    //marginTop: Platform.OS == 'ios'? 30 : 0
  },
  textStyle: {
    padding: 10,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  
});


export default connect(null, {
  signoutUser,mapLoaded
})(RiderHome);