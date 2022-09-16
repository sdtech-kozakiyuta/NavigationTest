import * as React from 'react';  // わからん
import {useContext} from 'react';
import {Button, TextInput, View, Text} from 'react-native';
import { Context } from '../../App';

function LoginScreen({navigation}) {
  const [state, dispatch] = useContext(Context);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="User ID"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
      />
      <TextInput
        placeholder="Password"
        style={{height: 200, padding: 10, backgroundColor: 'white'}}
      />
      <Button
        title="Login"
        onPress={() => {
          dispatch({isLogin: true});
        }}
      />
      <Button
        title="Signup"
        onPress={()=>{
          navigation.push('Signup');
          
        }}
      />
    </View>
  );
}

export default LoginScreen;
