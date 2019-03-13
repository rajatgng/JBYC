import React, { Component } from 'react';
import { View,AsyncStorage,StyleSheet} from 'react-native';
import {LinearGradient } from 'expo';
import {Button} from 'react-native-elements';

export default class AuthScreen extends Component {

  static navigationOptions = {
      headerTitle:"Just Book Your Cab - JBYC",
     
      headerBackground: (
        <LinearGradient
          colors={['#5ED2A0', '#339CB1']}
          style={{ flex: 1 }}
          start={[0, 0]}
          end={[1, 0]}
        />
      ),
    
  }
  // async componentDidMount(){
  //   // await AsyncStorage.removeItem('login_token');   

  //     const login_token = await AsyncStorage.getItem('login_token');  
  //     const type = await AsyncStorage.getItem('type');        
  //     if(type==='rider'){
  //       if(login_token)
  //       this.props.navigation.navigate('RiderHome');
  //     }
  //     if(type === 'driver'){
  //       if(login_token)
  //       this.props.navigation.navigate('DriverHome');
  //     }
  // }
  render() {
    return (
      <LinearGradient 
      style={{flex:1}} 
      locations={[0, 1.0]} 
      colors={['#5ED2A0', '#339CB1']}
      >
     <View style = {styles.container}>
        <Button
          containerStyle={styles.btn}
          buttonStyle={styles.btn2}
          titleStyle={styles.btn3}
          title="Driver"
          onPress={ () => this.props.navigation.navigate('AuthScreenDriver')}
          />
        <Button
          containerStyle={styles.btn}
          buttonStyle={styles.btn2}
          titleStyle={styles.btn3}
          title="Rider"
          onPress={ () => this.props.navigation.navigate('AuthScreenRider')}
      />
       </View>
       </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: linear-gradient(to bottom left, #66ccff 0%, #ff99cc 100%);,
      justifyContent: 'center',
      alignItems:'center',
      width:'100%',
      
      
    },
    btn:{
        width:'80%',
    },
    btn2:{
        borderRadius:120,marginBottom:20,
    },
    btn3:{
        fontSize:20
    },
    insidecontainer:{
        flex:1,
         alignItems:'center',
         width:'100%',padding:10,
         marginTop:30
     },
  });

