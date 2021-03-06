
import {Card ,Button,Icon,ListItem} from 'react-native-elements';
 import {connect} from 'react-redux';
  import React,{Component} from 'react';
  import {signoutUser} from '../src/actions/auth_action'
  import { Text, View, StyleSheet, FlatList,ScrollView,Dimensions, } from 'react-native';
  import {LinearGradient} from 'expo';
   class DriverHome extends Component{
    
    static navigationOptions = ({navigation,state }) => {
      return{
       headerTitle:"Let's Ride",
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
     signout_User = ()=>{
       this.props.signoutUser();
       this.props.navigation.navigate('Auth');
     }
     async  componentDidMount(){
        this.props.navigation.setParams({ signoutuser: this.signout_User });
  }
    btnAction = () =>{
      alert("Booking Accept. Go pickup the customer")
    }
     render(){
       return(
        <ScrollView style={styles.container}>  
        <View>
          <Card
            title='Rajat'
            titleStyle={styles.titleStyle}
            image={require('../assets/mgmap.png')}>
            <Text style={{marginBottom: 10,fontSize:20}}>
            Contact no.: 9988776655
            </Text>
           
            <Button
              onPress = {this.btnAction}
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Accept' 
              />
          </Card>
        </View>
        <View>
          <Card
            title='Arpit'
            titleStyle={styles.titleStyle}
            image={require('../assets/mgmap.png')}>
            <Text style={{marginBottom: 10,fontSize:20}}>
            Contact no.: 9988776655
            </Text>
            <Button
              onPress = {this.btnAction}
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Accept' 
              />
          </Card>
        </View>
        <View>
          <Card
            title='Dasna'
            titleStyle={styles.titleStyle}
            image={require('../assets/mgmap.png')}>
            <Text style={{marginBottom: 10,fontSize:20}}>
              Contact no.: 9988776655
            </Text>
            <Button
              onPress = {this.btnAction}
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Accept' 
              />
          </Card>
        </View>
        <View>
          <Card
            title='Rohit'
            titleStyle={styles.titleStyle}
            image={require('../assets/mgmap.png')}>
            <Text style={{marginBottom: 10,fontSize:20}}>
            Contact no.: 9988776655
            </Text>
            <Button
             onPress = {this.btnAction}
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Accept' 
              />
          </Card>
        </View>
      </ScrollView>
     

       );
   }
  }
  const styles = StyleSheet.create({
    container:{
      flex: 1,
    backgroundColor: '#fff',
    marginTop: 25
    },
    viewStyle: {
      justifyContent: 'center',
      flex: 1,
      backgroundColor:'white',
      //marginTop: Platform.OS == 'ios'? 30 : 0
    },
    textStyle: {
      padding: 10,
    },
    titleStyle:{
      fontSize:20,
      fontWeight: 'bold',
    }
    
  });
  
  
  export default connect(null, {
    signoutUser
  })(DriverHome);