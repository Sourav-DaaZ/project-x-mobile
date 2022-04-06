import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Input from '../../common/elements/input'

function Login() {
    



  const setUserId =(val)=>
  {
    console.log(val);
  }

  return (
     <View style={styles.container}>
          <View style={styles.inputContainer}>
              
              <Input 
                  style={styles.TextInput} 
                  placeholder="Email / User Name *"
                  onChangeText={setUserId}

                  type={'text'}
                  />
              <Input 
                  style={styles.TextInput} 
                  placeholder="Password *"
                  onChangeText={newText => setUserId(newText)}
                  type={'password'}
                  />
          </View>
    </View>
  );
    {/* <SafeAreaView style={backgroundStyle}> */}
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
}


const styles =StyleSheet.create({
  container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white'
  },
  inputContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      
      width: "100%"
  },
  TextInput: {
      fontSize:15,
      textAlign: 'center',
      backgroundColor: '#eeeeee',
      width:'90%',

      borderStyle: 'solid',
      borderColor: 'grey',
      borderWidth: 0.2,
  },
  btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: "90%"
  },
  btn: {
      marginTop:30,
      backgroundColor:'grey',
      width:"45%",
      padding:15
  },
  btnTxt: {
      textAlign: 'center',
      color: 'white',

  }
  

})


export default Login;