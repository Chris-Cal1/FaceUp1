import React, {useState} from 'react';
import { StyleSheet, View, ImageBackground} from 'react-native';
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen(props) {

  const [pseudo, setPseudo] = useState('');

    return (
      <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>
   
      
        
      <Input
     containerStyle = {{marginBottom: 25, width: '70%'}}
     inputStyle={{marginLeft: 10}}
      placeholder='Name'
     leftIcon={
       <Icon
       name='user'
       size={24}
       color="#009788"
       />
    } 
   onChangeText={(e) => setPseudo(e)}
   />

       
    <Button
       icon={
          <Icon
            name="arrow-right"
            size={20}
            color="#eb4d4b"
          />
        }

      title="Go to gallery"
      buttonStyle={{backgroundColor: "#009788"}}
      type="solid"
      onPress={() => props.navigation.navigate('BottomNavigator', { screen: 'Gallery' })}

      />
        
        

  </ImageBackground>  
  
  
  
     
    );
  }
  
  const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
     },
  });